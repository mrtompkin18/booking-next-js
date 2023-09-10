"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

function page() {

  const session = useSession()

  return (
    <div>{JSON.stringify(session)} </div>
  )
}

export default page