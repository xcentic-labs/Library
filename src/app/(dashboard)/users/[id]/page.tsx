"use client"
import getuser from './Controller/getuser'

export default function User() {
    const { data, isloading, formatDate } = getuser()
    return (
        <section className="w-full h-full md:p-10 p-5">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer" >Dashboard</span> / All Users / {data?.id}</h1>
            <div className="rounded-t-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white mb-8">
                <table className="min-w-full text-sm text-gray-700 ">
                    <thead className=" text-base font-semibold border-[1.5px] border-black">
                        <tr className='bg-greenleast text-white'>
                            <th className='h-10' colSpan={4}>User Details</th>
                        </tr>
                        <tr className=''>
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
            <div className="rounded-t-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className=" text-base font-semibold border-[1.5px] border-black">
                        <tr className='bg-greenleast text-white'>
                            <th className='h-10' colSpan={6}>User Seat Details</th>
                        </tr>
                        <tr className=''>
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
                            data?.seat?.length == 0 ?
                                <tr className="w-full h-14" >
                                    <th className="w-full h-full border-[1.5px] border-black"  colSpan={5}>
                                        <h1>No Booked Seats</h1>
                                    </th>
                                </tr>
                                :
                                data?.seat?.map((seat, index) => (
                                    <tr key={index} className='text-center'>
                                        <td className="py-3 px-6 border-[1.5px] border-black">{index + 1}</td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">{seat.seatNumber}</td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">{seat.layout?.layoutName}</td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">
                                            {seat.bookingEndDate === seat.bookingStartDate ? (
                                                <span className="text-gray-500  font-semibold">N/A</span>
                                            ) : (
                                                <span className="font-semibold">
                                                    {formatDate(seat.bookingStartDate)} - {formatDate(seat.bookingEndDate)}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">
                                            <span
                                                className={`px-4 py-[5px] rounded-lg text-xs font-semibold text-white ${seat.isLocker ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            >
                                                {seat.isLocker ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 border-[1.5px] border-black">
                                            Edit date
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}