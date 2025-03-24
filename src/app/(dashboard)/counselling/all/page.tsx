"use client"

import SessionListTable from "../SessionList/SessionList"
import getAllSession from "./Controller/getsession"

export default function AllCounselling() {
    const { data, isloading, redirect , handleMakrCompleted } = getAllSession()
    return (
        <section className="w-full h-full md:p-10 p-5 rounded-lg shadow-md overflow-y-scroll scrollbar">
            <h1 className="text-xl mb-6 text-gray-700 capitalize font-bold">
                Dashboard / All Session
            </h1>
            <SessionListTable data={data} isloading={isloading} redirect={redirect} handleMakrCompleted={handleMakrCompleted} />
        </section>
    )
}