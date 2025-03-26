"use client"

import { session, User } from "@/types/types"
import { FaEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Loader from "@/components/UI/Loader"
import { Value } from "@prisma/client/runtime/library"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"


interface SessionListProps {
    data: session[] | undefined,
    isloading: boolean,
    redirect: AppRouterInstance,
    handleMakrCompleted : (id : number| string) => void
}

export default function SessionListTable({ data, isloading, redirect , handleMakrCompleted }: SessionListProps) {

    return (
        <>
            <div className="rounded-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-greenleast text-white text-base font-semibold">
                        <tr>
                            <th className="py-3 px-6 text-nowrap">S.No.</th>
                            <th className="py-3 px-6 text-nowrap">Name</th>
                            <th className="py-3 px-6 text-nowrap">Phone Number</th>
                            <th className="py-3 px-6 text-nowrap">Email</th>
                            <th className="py-3 px-6 text-nowrap">Counselling Name</th>
                            <th className="py-3 px-6 text-nowrap">Amount Paid</th>
                            <th className="py-3 px-6 text-nowrap">Status</th>
                            <th className="py-3 px-6 text-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isloading ?
                                (
                                    <>
                                        <tr className="w-full h-[70vh]" >
                                            <th className="w-full h-full" colSpan={6}>
                                                <div className="w-full h-full flex justify-center items-center">
                                                    <Loader />
                                                </div>
                                            </th>
                                        </tr>
                                    </>
                                )
                                :
                                !data || data.length == 0
                                    ?
                                    <tr className="w-full h-14" >
                                        <th className="w-full h-full" colSpan={8}>
                                            <h1>No Counselling Found</h1>
                                        </th>
                                    </tr>
                                    :
                                    (
                                        data.map((counselling, index) => (
                                            <tr key={index} className="text-center">
                                                <th className="py-3 px-6">{index + 1}</th>
                                                <th className="py-3 px-6">{counselling.bookedBy.name}</th>
                                                <th className="py-3 px-6">{counselling.bookedBy.phoneNumber}</th>
                                                <th className="py-3 px-6">{counselling.bookedBy.email}</th>
                                                <th className="py-3 px-6">{counselling.counselling.name}</th>
                                                <th className="py-3 px-6">₹ {counselling.counselling.price}</th>
                                                <th className={`py-3 px-6 ${counselling.status ? 'text-green-600' : 'text-yellow-500'}`}>
                                                    {
                                                        counselling.status ? "Completed" : "Pending"
                                                    }
                                                </th>
                                                <th className="py-3 px-6">

                                                    {
                                                        counselling.status ?
                                                            <button className="px-2 bg-green-600 py-1 rounded-lg text-nowrap">
                                                                Done
                                                            </button>
                                                            :
                                                            <button className="px-2 bg-green-600 py-1 rounded-lg text-nowrap"
                                                            onClick={()=> handleMakrCompleted(counselling.id)}
                                                            >
                                                                Mark As Done
                                                            </button>
                                                    }

                                                </th>
                                            </tr>
                                        ))
                                    )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}