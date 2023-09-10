"use client"

import Image from 'next/image'
import { useEffect, useState, memo } from 'react'

function Cars({ onSelectedCar, rate = 1 }: any) {
    const [carList, setCarList] = useState<Array<any>>([])
    const [selectedCar, setSelectCar] = useState<any>()

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/car-list`).then(res => res.json())
            setCarList(response.data.car_list)
        })()
    }, [])

    useEffect(() => {
        onSelectedCar(selectedCar)
    }, [selectedCar])

    function getPrize(item: any) {
        return (rate * item.charges).toFixed(2)
    }

    return (
        <div>
            <h3 className="text-md font-semibold mb-5">Select Car</h3>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {carList.map((item: any, index: number) => (
                    <div
                        key={index}
                        className={`${item.id == selectedCar?.id ? "bg-yellow-300 border-yellow-400 border-1" : ""} flex flex-col cursor-pointer items-center p-3 shadow-md border-[1px] rounded-md gap-2`}
                        onClick={() => setSelectCar(item)}
                    >
                        <Image
                            className="w-full h-auto"
                            alt={item.name}
                            src={`/${item.image}`}
                            width={90}
                            height={90}
                            priority={true}
                        />
                        <div className="flex justify-between text-[12px] w-full">
                            <h2 className="text-gray-500">{item.name}</h2>
                            <h2 className="font-medium">{getPrize(item)}$</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Cars)