"use client"

import { seatbody } from "@/types/types"
import { FaEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

interface LayoutSeatListProps {
    data: seatbody[],
    formatDate: (value: Date | undefined) => string,
    handleAllotment: (seatId: string | number | undefined) => void
    handleUpdateBlockStatus : (status : boolean , seatId: string | number | undefined) => void
}

export default function LayoutSeatList({ data, formatDate, handleAllotment , handleUpdateBlockStatus }: LayoutSeatListProps) {

    return (
        <div className="rounded-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-greenleast text-white text-base font-semibold">
                    <tr>
                        {/* <th className="py-3 px-6">S.No.</th> */}
                        <th className="py-3 px-6">Seat Number</th>
                        <th className="py-3 px-6">Locker</th>
                        <th className="py-3 px-6">Booked</th>
                        <th className="py-3 px-6">Booking Period</th>
                        <th className="py-3 px-6">Allotment</th>
                        <th className="py-3 px-6">Block</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        data.length == 0
                            ?
                            <tr className="w-full h-14" >
                                <th className="w-full h-full" colSpan={7}>
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
                                        {/* index */}
                                        {/* <td className="py-3 px-6 font-semibold">{index + 1}</td> */}

                                        {/* seat Number */}
                                        <td className="py-3 px-6 capitalize">{item.seatNumber}</td>

                                        {/* locker avail or not */}
                                        <td className="py-3 px-6">
                                            <span
                                                className={`px-4 py-[5px] rounded-lg text-xs font-semibold text-white ${item.isLocker ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            >
                                                {item.isLocker ? "Yes" : "No"}
                                            </span>
                                        </td>

                                        {/* booking status */}
                                        <td className="py-3 px-6">
                                            <span
                                                className={`px-4 py-[5px] rounded-lg text-xs font-semibold text-white ${item.isBooked ? "bg-green-500" : "bg-red-500"}`}
                                            >
                                                {item.isBooked ? "Yes" : "No"}
                                            </span>
                                        </td>

                                        {/* booking period */}
                                        <td className="py-3 px-6">
                                            {item.bookingEndDate === item.bookingStartDate ? (
                                                <span className="text-gray-500  font-semibold">N/A</span>
                                            ) : (
                                                <span className="font-semibold">
                                                    {formatDate(item.bookingStartDate)} - {formatDate(item.bookingEndDate)}
                                                </span>
                                            )}
                                        </td>

                                        {/*Allot To  */}
                                        <td className="py-3 px-6 flex items-center justify-center  text-nowrap">
                                            {
                                                item.isBooked ?
                                                    <h4 className="font-bold text-green-600">Alloted</h4>
                                                    :
                                                    <button
                                                        className="bg-green-600 hover:bg-green-700 cursor-pointer p-2 rounded-md transition duration-200 shadow-md flex items-center justify-center text-nowrap font-bold"
                                                        onClick={() => handleAllotment(item.id)}
                                                    >
                                                        Allot To
                                                    </button>
                                            }
                                        </td>
                                        <td className="py-3 px-6">
                                            {
                                                item.isBooked ?
                                                    <h4 className="font-bold text-green-600 ">Alerady Alloted</h4>
                                                    :
                                                    <button
                                                        className={`${item.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} cursor-pointer p-2 rounded-md transition duration-200 shadow-md flex items-center justify-center text-nowrap font-bold`}
                                                        onClick={()=> handleUpdateBlockStatus( item.isBlocked ? false : true , item.id)}
                                                    >
                                                        {
                                                            item.isBlocked ?  "Unblock Seat" :"Block Seat"
                                                        }
                                                    </button>

                                            }
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