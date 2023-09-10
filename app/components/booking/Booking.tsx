"use client"

import SearchBox from '@/app/components/booking/SearchBox'
import Cars from '@/app/components/car/Cars'
import Payments from '@/app/components/payment/Payments'
import { useMapCoordinate } from '@/app/contexts/MapCoordinate'
import { useEffect, useState } from 'react'

function Booking() {
  const { sourceCoordinate, setSourceCoordinate, destinationCoordinate, setDestinationCoordinate, routeDetail } = useMapCoordinate()
  const [selectedPayment, setSelectedPayment] = useState<number>()
  const [selectedCar, setSelectedCar] = useState<number>()
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [priceRate, setPriceRate] = useState<number>()

  useEffect(() => {
    const isSelectedRoute = sourceCoordinate && destinationCoordinate
    const allCompleted = isSelectedRoute && selectedCar && selectedPayment
    setIsCompleted(allCompleted)
  }, [sourceCoordinate, destinationCoordinate, selectedCar, selectedPayment])

  useEffect(() => {
    if (routeDetail) {
      const rate = routeDetail.routes[0].distance * 0.000621371192
      setPriceRate(rate)
    }
  }, [routeDetail])

  function onBooking() {
    console.log("booked")
  }

  return (
    <div id="screen-scroll">
      <div className="space-y-5 p-10">
        <h2 className="font-semibold text-lg">Booking</h2>
        <SearchBox
          title="Where from?"
          onSetCoordinate={setSourceCoordinate}
        />
        <SearchBox
          title="Where to?"
          onSetCoordinate={setDestinationCoordinate}
        />
        <Cars
          rate={priceRate}
          onSelectedCar={setSelectedCar}
        />
        <Payments
          onSelectedPayment={setSelectedPayment}
        />
        <button
          className={`disabled:bg-slate-100 cursor-pointer w-full h-16 bg-yellow-300 rounded-md font-semibold`}
          disabled={!isCompleted}
          onClick={() => onBooking()}
        >
          Booking
        </button>
      </div>
    </div>
  )
}

export default Booking