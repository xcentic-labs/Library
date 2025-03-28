"use client"
import getUserDetails from "./Controller/getuserdetails"

export default function StudentDashBoard() {
    const { data, isloading, formatDate, calculateMonthsBetween } = getUserDetails();

    return (
        <section className="w-full h-full md:p-10 p-5 bg-gray-50 overflow-y-scroll scrollbar">
            <h1 className="text-2xl mb-6 text-[#32524D] capitalize font-bold">Dashboard</h1>

            <div className='w-full bg-white rounded-lg flex flex-col justify-center items-start p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-[#dad5be] mb-8'>
                <h3 className='text-xl font-semibold text-[#32524D] mb-4'>User Details</h3>
                <div className="w-full flex flex-col gap-2">
                    <p className="text-lg text-gray-700"><span className="font-bold text-[#32524D]">Name : </span> {data?.name}</p>
                    <p className="text-lg text-gray-700"><span className="font-bold text-[#32524D]">Your User ID : </span> {data?.id}</p>
                    <p className="text-lg text-gray-700"><span className="font-bold text-[#32524D]">Phone Number : </span> +91 {data?.phoneNumber}</p>
                    <p className="text-lg text-gray-700"><span className="font-bold text-[#32524D]">Email : </span> {data?.email}</p>
                </div>
            </div>

            <h3 className='text-xl font-semibold text-[#32524D] mb-4'>Seat Details</h3>
            {/* <div className='w-full bg-white rounded-lg flex flex-col justify-center items-start p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-[#dad5be]'> */}
            {
                data?.seat?.length == 0 ?
                    <div className="w-full bg-white rounded-lg flex flex-col justify-center items-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-[#dad5be] mb-8">
                        <p className="text-xl text-gray-700 mb-2 text-center"><span className="font-bold text-[#32524D]">No Seat Record Found </span></p>
                    </div>
                    :
                    data?.seat?.map((item, index) => (
                        <div key={index} className="w-full bg-white rounded-lg flex flex-col justify-center items-start p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-[#dad5be] mb-8">
                            <p className="text-lg text-gray-700 mb-2"><span className="font-bold text-[#32524D]">Layout Name : </span> {item.layout?.layoutName}</p>
                            <p className="text-lg text-gray-700 mb-2"><span className="font-bold text-[#32524D]">Seat Number : </span> {item.seatNumber}</p>
                            <p className="text-lg text-gray-700 mb-2"><span className="font-bold text-[#32524D]">Locker Available : </span> {item.isLocker ? "Yes" : "No"}</p>
                            <p className="text-lg text-gray-700 mb-2"><span className="font-bold text-[#32524D]">Booked For : </span>
                                <span className="px-3 py-1  rounded-full font-medium mb-2">
                                    {calculateMonthsBetween(item.bookingStartDate, item.bookingEndDate)} Months
                                </span>
                            </p>
                            <p className="text-lg text-gray-700"><span className="font-bold text-[#32524D]">Expires On : </span> {formatDate(item.bookingEndDate)}</p>
                        </div>
                    ))
            }
            {/* </div> */}
        </section>
    );
}
