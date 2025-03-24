"use client"
import SessionListTable from "../SessionList/SessionList"

import getPendingSession from "./Controller/getpendingsession"

export default function PendingCounselling() {
    const { data, isloading, redirect , handleMakrCompleted } = getPendingSession()
    return (
        <section className="w-full h-full md:p-10 p-5 rounded-lg shadow-md overflow-y-scroll scrollbar">
            <h1 className="text-xl mb-6 text-gray-700 capitalize font-bold">
                Dashboard / Pending Session
            </h1>
            <SessionListTable data={data} isloading={isloading} redirect={redirect} handleMakrCompleted={handleMakrCompleted} />
        </section>
    )
}