"use client"

import { admindashboard } from "./Controller/admindashboard";

export default function AdminDashBoard() {
    const {data} = admindashboard()
    return (
        <section className="w-full h-full md:p-10 p-5">
            <h1 className="text-xl mb-6 text-gray-700 capitalize font-bold">Dashboard</h1>

            <h2 className="text-xl mb-4 font-semibold text-[#32524D] capitalize">Seat Overview</h2>
            <div className='w-full flex flex-wrap items-center justify-between gap-5 mb-10'>
                <div className='w-full sm:w-56 h-24 bg-[#32524D] rounded-lg flex flex-col justify-center items-start p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer'>
                    <h3 className='text-lg font-medium text-white'>Total Layout</h3>
                    <p className='text-2xl font-bold text-white'>10</p>
                </div>
                <div className='w-full sm:w-56 h-24 bg-[#32524D] rounded-lg flex flex-col justify-center items-start p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer'>
                    <h3 className='text-lg font-medium text-white'>Total Seats</h3>
                    <p className='text-2xl font-bold text-white'>15</p>
                </div>
                <div className='w-full sm:w-56 h-24 bg-[#32524D] rounded-lg flex flex-col justify-center items-start p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer'>
                    <h3 className='text-lg font-medium text-white'>Booked Seats</h3>
                    <p className='text-2xl font-bold text-white'>20</p>
                </div>
                <div className='w-full sm:w-56 h-24 bg-[#32524D] rounded-lg flex flex-col justify-center items-start p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer'>
                    <h3 className='text-lg font-medium text-white'>Not Booked Seats</h3>
                    <p className='text-2xl font-bold text-white'>25</p>
                </div>
            </div>

            <h2 className="text-xl mb-4 font-semibold text-[#32524D] capitalize">User Overview</h2>
            <div className='w-full flex flex-wrap items-center justify-start gap-5 mb-10'>
                <div className='w-full sm:w-[40%] h-24 bg-[#32524D] rounded-lg flex flex-col justify-center items-start p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer'>
                    <h3 className='text-lg font-medium text-white'>Total Counseling Requests</h3>
                    <p className='text-2xl font-bold text-white'>10</p>
                </div>
                <div className='w-full sm:w-[40%] h-24 bg-[#32524D] rounded-lg flex flex-col justify-center items-start p-3 shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer'>
                    <h3 className='text-lg font-medium text-white'>Pending Counseling Requests</h3>
                    <p className='text-2xl font-bold text-white'>15</p>
                </div>
            </div>
        </section>
    );
}