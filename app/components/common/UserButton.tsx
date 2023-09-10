"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

function UserButton() {
    const session = useSession();
    
    if (!!session && session.status === "authenticated") {
        return (
            <div className="flex items-center rounded-full w-[45px] h-[45px] bg-yellow-500 overflow-hidden">
                <Link href="/api/auth/signout">
                    <Image
                        className="w-full"
                        width="45"
                        height="45"
                        src={session.data.user?.image!}
                        alt={session.data.user?.name!}
                    />
                </Link>
            </div>
        )
    } else {
        return (
            <Link href="/api/auth/signin">
                <button className="cursor-pointer bg-yellow-400 px-6 py-2 rounded-lg font-semibold">Login</button>
            </Link>
        )
    }
}

export default UserButton