"use client"
import { useState } from 'react';
import getuser from './Controller/getuser'
import axios from 'axios';
import { seatbody } from '@/types/types';

export default function User() {
    const { data, isloading, formatDate, getSpecficUser } = getuser()
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedDates, setEditedDates] = useState<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' });
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleEdit = (seat : any) => {
        setEditIndex(seat.id);
        setEditedDates({
            startDate: seat.bookingStartDate?.slice(0, 10),
            endDate: seat.bookingEndDate?.slice(0, 10)
        });
    };

    const handleUpdate = async (seatId : number | undefined) => {
        try {
            setLoadingUpdate(true);
            await axios.patch(`/api/seat/${seatId}`, {
                bookingStartDate: editedDates.startDate,
                bookingEndDate: editedDates.endDate
            });
            setEditIndex(null);
            setEditedDates({ startDate: '', endDate: '' });
            getSpecficUser();
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setLoadingUpdate(false);
        }
    };

    return (
        <section className="w-full h-full md:p-10 p-5">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize">
                <span className="text-gray-500 cursor-pointer">Dashboard</span> / All Users / {data?.id}
            </h1>

            {/* User Details Table */}
            <div className="rounded-t-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white mb-8">
                <table className="min-w-full text-sm text-gray-700 ">
                    <thead className=" text-base font-semibold border-[1.5px] border-black">
                        <tr className='bg-greenleast text-white'>
                            <th className='h-10' colSpan={4}>User Details</th>
                        </tr>
                        <tr>
                            <th className="py-3 px-6 border-[1.5px] border-black">Name </th>
                            <th className="py-3 px-6 border-[1.5px] border-black">{data?.name}</th>
                            <th className="py-3 px-6 border-[1.5px] border-black">Phone Number</th>
                            <th className="py-3 px-6 border-[1.5px] border-black">{data?.phoneNumber}</th>
                        </tr>
                        <tr>
                            <th className="py-3 px-6 border-[1.5px] border-black">Email </th>
                            <th className="py-3 px-6 border-[1.5px] border-black">{data?.email}</th>
                            <th className="py-3 px-6 border-[1.5px] border-black">Role</th>
                            <th className="py-3 px-6 border-[1.5px] border-black">{data?.role}</th>
                        </tr>
                    </thead>
                </table>
            </div>

            {/* Seat Details Table */}
            <div className="rounded-t-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className=" text-base font-semibold border-[1.5px] border-black">
                        <tr className='bg-greenleast text-white'>
                            <th className='h-10' colSpan={6}>User Seat Details</th>
                        </tr>
                        <tr>
                            <th className="py-3 px-6 border-[1.5px] border-black">S.No.</th>
                            <th className="py-3 px-6 border-[1.5px] border-black">Seat Number</th>
                            <th className="py-3 px-6 border-[1.5px] border-black">Layout Name</th>
                            <th className="py-3 px-6 border-[1.5px] border-black">Booking Date</th>
                            <th className="py-3 px-6 border-[1.5px] border-black">Locker</th>
                            <th className="py-3 px-6 border-[1.5px] border-black">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.seat?.length === 0 ? (
                                <tr className="w-full h-14">
                                    <th className="w-full h-full border-[1.5px] border-black" colSpan={6}>
                                        <h1>No Booked Seats</h1>
                                    </th>
                                </tr>
                            ) : (
                                data?.seat?.map((seat, index) => (
                                    <tr key={index} className='text-center'>
                                        <td className="py-3 px-6 border-[1.5px] border-black">{index + 1}</td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">{seat.seatNumber}</td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">{seat.layout?.layoutName}</td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">
                                            {
                                                editIndex === seat.id ? (
                                                    <div className="flex flex-col items-center gap-1">
                                                        <input
                                                            type="date"
                                                            value={editedDates.startDate}
                                                            onChange={(e) => setEditedDates({ ...editedDates, startDate: e.target.value })}
                                                            className="border rounded px-2 py-1"
                                                        />
                                                        <input
                                                            type="date"
                                                            value={editedDates.endDate}
                                                            onChange={(e) => setEditedDates({ ...editedDates, endDate: e.target.value })}
                                                            className="border rounded px-2 py-1"
                                                        />
                                                    </div>
                                                ) : (
                                                    seat.bookingEndDate === seat.bookingStartDate ? (
                                                        <span className="text-gray-500  font-semibold">N/A</span>
                                                    ) : (
                                                        <span className="font-semibold">
                                                            {formatDate(seat.bookingStartDate)} - {formatDate(seat.bookingEndDate)}
                                                        </span>
                                                    )
                                                )
                                            }
                                        </td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">
                                            <span className={`px-4 py-[5px] rounded-lg text-xs font-semibold text-white ${seat.isLocker ? "bg-green-500" : "bg-red-500"}`}>
                                                {seat.isLocker ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">
                                            {
                                                editIndex === seat.id ? (
                                                    <button
                                                        className="bg-blue-500 text-white px-3 py-[5px] rounded text-xs"
                                                        onClick={() => handleUpdate(seat.id)}
                                                        disabled={loadingUpdate}
                                                    >
                                                        {loadingUpdate ? "Saving..." : "Save"}
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="bg-yellow-500 text-white px-3 py-[5px] rounded text-xs"
                                                        onClick={() => handleEdit(seat)}
                                                    >
                                                        Edit
                                                    </button>
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}
