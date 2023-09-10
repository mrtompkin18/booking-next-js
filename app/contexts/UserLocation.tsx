"use client"

import { createContext, useContext, useEffect, useState } from 'react'

export type UserLocation = {
  lat?: number
  lng?: number
}

export const UserLocationContext = createContext<any>(null)

function useUserLocation(): any {
  const { location, setLocation } = useContext(UserLocationContext)
  return { location, setLocation }
}
function UserLocationProvider({ children }: any) {
  const [location, setLocation] = useState<UserLocation>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  return (
    <UserLocationContext.Provider
      value={{ location, setLocation }}
    >
      {children}
    </UserLocationContext.Provider>
  )
}

export { UserLocationProvider, useUserLocation }