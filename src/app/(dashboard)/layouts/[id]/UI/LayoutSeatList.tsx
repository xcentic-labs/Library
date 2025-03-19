"use client"

import { seatbody } from "@/types/types"
import { FaEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

interface LayoutSeatListProps {
    data: seatbody[],
    formatDate : ( value : Date  | undefined)=> string
}

export default function LayoutSeatList({ data , formatDate }: LayoutSeatListProps) {

    return (
        <div className="rounded-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-greenleast text-white text-base font-semibold">
                    <tr>
                        <th className="py-3 px-6">S.No.</th>
                        <th className="py-3 px-6">Seat Number</th>
                        <th className="py-3 px-6">Locker</th>
                        <th className="py-3 px-6">Booked</th>
                        <th className="py-3 px-6">Booking Period</th>
                        <th className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        data.length == 0
                            ?
                            <tr className="w-full h-14" >
                                <th className="w-full h-full" colSpan={6}>
                                    <h1>No Layout Found</h1>
                                </th>
                            </tr>
                            :
                            (
                                data.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`text-center font-medium text-md border-b-2 border-b-slate-200 transition duration-200 ${index % 2 ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-100"
                                            }`}
                                    >
                                        <td className="py-3 px-6 font-semibold">{index + 1}</td>

                                        <td className="py-3 px-6 capitalize">{item.seatNumber}</td>

                                        <td className="py-3 px-6">
                                            <span
                                                className={`px-4 py-[5px] rounded-lg text-xs font-semibold text-white ${item.isLocker ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            >
                                                {item.isLocker ? "Yes" : "No"}
                                            </span>
                                        </td>

                                        <td className="py-3 px-6">
                                            <span
                                                className={`px-4 py-[5px] rounded-lg text-xs font-semibold text-white ${item.isBooked ? "bg-green-500" : "bg-red-500"}`}
                                            >
                                                {item.isBooked ? "Yes" : "No"}
                                            </span>
                                        </td>

                                        <td className="py-3 px-6">
                                            {item.bookingEndDate === item.bookingStartDate ? (
                                                <span className="text-gray-500  font-semibold">N/A</span>
                                            ) : (
                                                <span className="font-semibold">
                                                    {formatDate(item.bookingStartDate)} - {formatDate(item.bookingEndDate)}
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-3 px-6 flex items-center justify-center gap-3">
                                            <button
                                                className="bg-greenleast hover:bg-greenleastshade cursor-pointer p-2 rounded-md transition duration-200 shadow-md flex items-center justify-center"
                                                title="View Details"
                                            >
                                                <FaEye className="text-white text-md" />
                                            </button>
                                            <button
                                                className="bg-red-600 hover:bg-red-500 cursor-pointer p-2 rounded-md transition duration-200 shadow-md flex items-center justify-center"
                                                title="Delete"
                                            >
                                                <MdDelete className="text-white text-md" />
                                            </button>
                                        </td>
                                    </tr>

                                ))
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}