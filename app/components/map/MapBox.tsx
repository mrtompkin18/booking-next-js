"use client"

import { useEffect, useRef, useState } from 'react'
import Map, { Layer, Marker, Source } from 'react-map-gl'
import { RiMapPin2Fill } from 'react-icons/ri'

import { useMapCoordinate } from '@/app/contexts/MapCoordinate'
import { useUserLocation } from '@/app/contexts/UserLocation'

import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_DRIVING_URL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'

function MapBox() {
  const mapRef = useRef<any>()
  const [destinationRoutes, setDetinationRoutes] = useState<any>()
  const { location } = useUserLocation()
  const { sourceCoordinate, destinationCoordinate, setRouteDetail } = useMapCoordinate()

  useEffect(() => {
    if (sourceCoordinate) {
      animateToPosition(sourceCoordinate)
      applyLineDirectionRoute()
    } else {
      resetLineDirectionRoute()
    }
  }, [sourceCoordinate])

  useEffect(() => {
    if (destinationCoordinate) {
      animateToPosition(destinationCoordinate)
      applyLineDirectionRoute()
    } else {
      resetLineDirectionRoute()
    }
  }, [destinationCoordinate])

  useEffect(() => {
    setRouteDetail(destinationRoutes)
  }, [destinationRoutes])

  function resetLineDirectionRoute() {
    setDetinationRoutes(null)
  }

  function animateToPosition(position: { lng: number, lat: number }) {
    mapRef.current?.flyTo({
      center: [position.lng, position.lat],
      duration: 2500
    })
  }

  async function applyLineDirectionRoute() {
    if (sourceCoordinate && destinationCoordinate) {
      const url = `${MAPBOX_DRIVING_URL}${sourceCoordinate.lng},${sourceCoordinate.lat};${destinationCoordinate.lng},${destinationCoordinate.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESSS_TOKEN}`
      const response = await fetch(url).then(res => res.json())
      setDetinationRoutes(response)
    }
  }

  return location && (
    <div>
      <Map
        ref={mapRef}
        id="screen-scroll"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESSS_TOKEN}
        initialViewState={{
          zoom: 14,
          longitude: location.lng,
          latitude: location.lat
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >

        {sourceCoordinate &&
          <Marker
            longitude={sourceCoordinate.lng}
            latitude={sourceCoordinate.lat}
            anchor="bottom"
          >
            <RiMapPin2Fill size={40} color="red" />
          </Marker>
        }

        {destinationRoutes &&
          <Source
            type="geojson"
            data={{
              properties: null,
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: destinationRoutes?.routes[0]?.geometry?.coordinates
              }
            }}
          >
            <Layer
              type="line"
              layout={{ "line-join": "round", "line-cap": "square" }}
              paint={{ "line-color": "red", "line-width": 4 }}
            />
          </Source>
        }

        {destinationCoordinate &&
          <Marker
            longitude={destinationCoordinate.lng}
            latitude={destinationCoordinate.lat}
          >
            <RiMapPin2Fill size={40} color="red" />
          </Marker>
        }
      </Map>
    </div>
  )
}

export default MapBox