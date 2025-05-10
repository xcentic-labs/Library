"use client"
import getUserDetails from "./Controller/getuserdetails"
import { useState } from "react"

export default function StudentDashBoard() {
    const { data, isloading, formatDate, calculateMonthsBetween } = getUserDetails();

    if (isloading) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
            </div>
        );
    }

    return (
        <section className="w-full h-full overflow-y-scroll scrollbar bg-gray-50">

            <div className="max-w-7xl mx-auto p-6">
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500">
                            <h3 className="text-sm font-medium text-gray-500">Active Seats</h3>
                            <p className="text-2xl font-bold text-gray-800 mt-2">{data?.seat?.length || 0}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                            <h3 className="text-sm font-medium text-gray-500">Lockers</h3>
                            <p className="text-2xl font-bold text-gray-800 mt-2">
                                {data?.seat?.filter(seat => seat.isLocker).length || 0}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
                            <h3 className="text-sm font-medium text-gray-500">User ID</h3>
                            <p className="text-2xl font-bold text-gray-800 mt-2">{data?.id}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
                            <h3 className="text-sm font-medium text-gray-500">Status</h3>
                            <p className="text-2xl font-bold text-gray-800 mt-2">Active</p>
                        </div>
                    </div>

                    {/* User Profile Card */}
                    <div className="bg-white rounded-lg shadow-md mb-8">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                                    <p className="text-gray-800">{data?.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">User ID</h3>
                                    <p className="text-gray-800">{data?.id}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                                    <p className="text-gray-800">{data?.email}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
                                    <p className="text-gray-800">+91 {data?.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Seats Preview */}
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Recent Seats</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Layout
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Seat No.
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Slot
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Duration
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Expires On
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data?.seat?.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                No seat records found
                                            </td>
                                        </tr>
                                    ) : (
                                        data?.seat?.slice(0, 3).map((seat, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    {seat.layout?.layoutName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                                        {seat.seatNumber}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    {seat.slot}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                                                        {calculateMonthsBetween(seat.bookingStartDate, seat.bookingEndDate)} Months
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    {formatDate(seat.bookingEndDate)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            </div>
        </section>
    );
}