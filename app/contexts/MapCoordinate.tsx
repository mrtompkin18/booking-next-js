"use client"

import React, { createContext, useContext, useState } from 'react'

export const MapCoordinateContext = createContext({})

function MapCoordinateProvider({ children }: any) {
    const [sourceCoordinate, setSourceCoordinate] = useState()
    const [destinationCoordinate, setDestinationCoordinate] = useState()
    const [routeDetail, setRouteDetail] = useState()

    return (
        <MapCoordinateContext.Provider value={{
            sourceCoordinate, setSourceCoordinate,
            destinationCoordinate, setDestinationCoordinate,
            routeDetail, setRouteDetail
        }}>
            {children}
        </MapCoordinateContext.Provider>
    )
}

function useMapCoordinate(): any {
    return useContext(MapCoordinateContext)
}

export { MapCoordinateProvider, useMapCoordinate }