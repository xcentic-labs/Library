"use client"

import { User } from "@/types/types"
import { FaEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Loader from "@/components/UI/Loader"
import { Value } from "@prisma/client/runtime/library"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

interface LayoutSeatListProps {
    data: User[] | undefined,
    isloading: boolean,
    redirect : AppRouterInstance
}

export default function UserListTable({ data, isloading, redirect }: LayoutSeatListProps) {

    return (
        <>
            <div className="rounded-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-greenleast text-white text-base font-semibold">
                        <tr>
                            <th className="py-3 px-6">S.No.</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Phone Number</th>
                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Subscribed</th>
                            <th className="py-3 px-6">Profile Complete</th>
                            <th className="py-3 px-6">Action</th>
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
                                        <th className="w-full h-full" colSpan={6}>
                                            <h1>No Layout Found</h1>
                                        </th>
                                    </tr>
                                    :
                                    (
                                        data.map((user, index) => (

                                            <tr key={index} className="text-center">
                                                <th className="py-3 px-6">{index + 1}</th>
                                                <th className="py-3 px-6">{user.name}</th>
                                                <th className="py-3 px-6">{user.phoneNumber}</th>
                                                <th className="py-3 px-6">{user.email}</th>
                                                <td className="py-3 px-6">
                                                    <span
                                                        className={`px-4 py-[5px] rounded-lg text-xs font-semibold text-white ${user.seat?.length != 0 ? "bg-green-500" : "bg-red-500"
                                                            }`}
                                                    >
                                                        {user.seat?.length != 0 ? "Yes" : "No"}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6">
                                                    <span
                                                        className={`px-4 py-[5px] rounded-lg text-xs font-semibold text-white ${user.isProfileComplete ? "bg-green-500" : "bg-red-500"
                                                            }`}
                                                    >
                                                        {user.isProfileComplete ? "Yes" : "No"}
                                                    </span>
                                                </td>
                                                <th className="py-3 px-6 flex justify-center">
                                                    <button
                                                        className="bg-greenleast hover:bg-greenleastshade cursor-pointer p-2 rounded-md transition duration-200 shadow-md flex items-center justify-center"
                                                        title="View Details"
                                                        onClick={() => redirect.push(`/users/${user.id}`) }
                                                    >
                                                        <FaEye className="text-white text-md" />
                                                    </button>
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