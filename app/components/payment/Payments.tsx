"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Payments({ onSelectedPayment }: any) {
    const [paymentList, setPaymentList] = useState([])
    const [selectPayment, setSelectPayment] = useState<number>()

    useEffect(() => {
        onSelectedPayment(selectPayment!)
    }, [selectPayment])

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/payment-methods`).then(res => res.json())
            setPaymentList(response.data.payment_methods)
        })()
    }, [])

    return (
        <div>
            <h3 className="text-md font-semibold mb-5">Select Payment Method</h3>
            <div className="flex items-center justify-between">
                {paymentList.map((item: any, index: number) => (
                    <div
                        key={index}
                        className={`${item.id == selectPayment ? "bg-yellow-300 border-yellow-400 border-1" : ""} w-[auto] h-[40px] border-[1px] px-2 flex items-center rounded-md cursor-pointer`}
                        onClick={() => setSelectPayment(item.id)} >
                        <Image
                            className="w-full"
                            src={`/${item.image}`}
                            alt={item.name}
                            width={30}
                            height={5}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Payments