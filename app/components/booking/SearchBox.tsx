"use client"

import { memo, useEffect, useMemo, useState } from 'react'

const MAPBOX_RETRIVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'

function SearchBox({ title, onSetCoordinate }: { title: string, onSetCoordinate: (obj: any) => {} }) {
    const [keyword, setKeyword] = useState<any>("")
    const [addressList, setAddressList] = useState<any>([])

    useEffect(() => {
        if (!keyword) {
            setAddressList([])
            onSetCoordinate(null)
            return
        }

        const timeout = setTimeout(async () => {
            const addresses = await getAddress(keyword)
            setAddressList(addresses)
        }, 400)

        return () => clearTimeout(timeout)
    }, [keyword])

    const getAddress = useMemo(() => {
        return async (searchText: string): Promise<any> => {
            const response = await fetch(`/api/search-address?q=${searchText}`).then((res) => res.json())
            return response?.data?.suggestions
        }
    }, [keyword])

    const onSelected = async (item: any) => {
        const { features } = await fetch(`${MAPBOX_RETRIVE_URL}${item.mapbox_id}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_ID}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSS_TOKEN}`).then(res => res.json())
        onSetCoordinate({
            lng: features[0].geometry.coordinates[0],
            lat: features[0].geometry.coordinates[1]
        })
        setKeyword(item.full_address ?? item.place_formatted ?? item.name)
    }

    return (
        <div>
            <h4 className="text-slate-400">{title}</h4>
            <input
                id="search-address"
                className="border-gray-200 border-[1px] w-full h-[40px] p-2"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <div>
                {addressList.map((item: any, index: number) => (
                    <h2
                        key={index}
                        className="text-sm cursor-pointer border-b-[1px] p-2 hover:bg-slate-50 text-slate-500"
                        onClick={() => onSelected(item)}
                    >
                        {item.full_address ?? item.place_formatted ?? item.name}
                    </h2>
                ))}
            </div>
        </div>
    )
}

export default memo(SearchBox)