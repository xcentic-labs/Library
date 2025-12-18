"use client"
import getuser from './Controller/getuser'

export default function User() {
    const { data, isloading, formatDate } = getuser()
    return (
        <section className="w-full h-full md:p-10 p-5 overflow-y-auto scrollbar">
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
            {/* Additional Info: mother, father, aadhar, photos */}
            <div className="rounded-t-xl overflow-x-auto scrollbar border border-gray-300 shadow-md bg-white p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Additional Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border rounded">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Mother's Name</h3>
                        <p className={`${data?.motherName ? 'text-gray-800' : 'text-gray-400 italic'}`}>{data?.motherName ?? 'Not provided'}</p>
                    </div>
                    <div className="p-4 border rounded">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Father's Name</h3>
                        <p className={`${data?.fatherName ? 'text-gray-800' : 'text-gray-400 italic'}`}>{data?.fatherName ?? 'Not provided'}</p>
                    </div>
                    <div className="p-4 border rounded">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Aadhar Number</h3>
                        <p className={`${data?.AadharNumber ? 'text-gray-800 font-mono' : 'text-gray-400 italic'}`}>{data?.AadharNumber ?? 'Not provided'}</p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded flex flex-col items-start">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">User Photo</h3>
                        { (data as any)?.userPhoto ? (
                            <img src={(data as any).userPhoto} alt="user" className="w-40 h-40 object-cover rounded" />
                        ) : (
                            <div className="w-40 h-40 flex items-center justify-center bg-gray-50 text-gray-400 rounded">Not uploaded</div>
                        ) }
                    </div>
                    <div className="p-4 border rounded flex flex-col items-start">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Aadhar Photo</h3>
                        { (data as any)?.aadharPhoto ? (
                            <img src={(data as any).aadharPhoto} alt="aadhar" className="w-40 h-40 object-cover rounded" />
                        ) : (
                            <div className="w-40 h-40 flex items-center justify-center bg-gray-50 text-gray-400 rounded">Not uploaded</div>
                        ) }
                    </div>
                </div>
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