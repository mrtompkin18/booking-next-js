"use client"

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

function UserButton() {
    const session = useSession();
    if (!!session && session.status === "authenticated") {
        return (
            <div className="flex items-center rounded-full w-[45px] h-[45px] bg-yellow-500 overflow-hidden">
                <Image
                    className="w-full"
                    width="45"
                    height="45"
                    src={session.data.user?.image!}
                    alt={session.data.user?.name!}
                />
            </div>
        )
    } else {
        return (
            <div>UserButton</div>
        )
    }
}

export default UserButton