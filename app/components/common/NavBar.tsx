import React from 'react'
import UserButton from './UserButton'
import Link from 'next/link'

function NavBar() {
    return (
        <div className="w-full border-b-[1px] h-[80px] flex items-center shadow-md shadow-slate-100">
            <div className="w-full flex justify-between px-10">
                <div className="flex items-center flex-row gap-10">
                    <Link href={"/"}><h1 className="font-semibold text-2xl">TaxiGo</h1></Link>
                    <div className="flex gap-10">
                        <Link href={"/"}><h2>Home</h2></Link>
                        <Link href={"/history"}><h2>History</h2></Link>
                        <Link href={"/#"}><h2>Help</h2></Link>
                    </div>
                </div>
                <UserButton />
            </div>
        </div>
    )
}

export default NavBar