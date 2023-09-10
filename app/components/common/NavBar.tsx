import React from 'react'
import UserButton from './UserButton'

function NavBar() {
    return (
        <div className="w-full border-b-[1px] h-[80px] flex items-center shadow-md shadow-slate-100">
            <div className="w-full flex justify-between px-10">
                <div className="flex items-center flex-row gap-10">
                    <h1 className="font-semibold text-2xl">TaxiGo</h1>
                    <div className="flex gap-10">
                        <h2>Home</h2>
                        <h2>History</h2>
                        <h2>Help</h2>
                    </div>
                </div>
                <UserButton/>
            </div>
        </div>
    )
}

export default NavBar