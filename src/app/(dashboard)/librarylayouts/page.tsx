"use client"
import LayoutGrid from "../layouts/[id]/UI/LayoutGrid"
import libraryLayoutsController from "./Controllers/libraryLayoutsControllers"
import Script from "next/script"
import { BiSolidZoomIn, BiSolidZoomOut } from "react-icons/bi";
import { FaLock } from "react-icons/fa";



export default function StudentLayout() {
    const {
        redirect, layoutName, handleChnageLayout, data, generatearray, setTimePeriod, setSeatNumber, handleBookSeat, seatNumber, timePeriod, total, handleChnageAmount, scale, setScale, slot, setSlot
    } = libraryLayoutsController()

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <section className="w-full h-full md:p-10 p-5 overflow-y-scroll scrollbar">
                <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer" onClick={() => redirect.push('/admindashboard')}>Dashboard</span> / Layout</h1>
                <div className="mb-5">
                    <select name="" id="" className="w-full p-2 border-2 border-greenleast rounded-md  font-bold" onChange={(e) => handleChnageLayout(e)}>
                        <option value="0">Select</option>
                        {
                            layoutName?.map((layout, index) => (
                                <option key={index} value={layout?.id}>{layout.layoutName}</option>
                            ))
                        }
                    </select>
                </div>
                {
                    !data ?
                        ""
                        :
                        (
                            <>
                                {/* Header */}
                                <h1 className="text-2xl w-full text-center bg-greenleast text-white font-bold uppercase rounded-t-2xl py-4 shadow-md">
                                    Layout Design
                                </h1>

                                {/* Layout Grid Section */}
                                <div className="w-full sm:h-full h-[30rem] p-4 sm:p-8 md:p-12 overflow-auto scrollbar-thin scrollbar-thumb-greenleast border-4 border-greenleast bg-slate-100 shadow-inner relative">
                                    {data ? (
                                        <LayoutGrid
                                            cols={data.layoutCols}
                                            rows={data.layoutRows}
                                            array={generatearray(data)}
                                            scale={scale}
                                        />
                                    ) : (
                                        <p className="text-gray-500 text-center py-10">Loading layout...</p>
                                    )}
                                </div>

                                {/* Zoom Controls */}
                                <div className="flex border-4 border-greenleast border-t-0 rounded-b-2xl bg-white shadow-sm">
                                    <div className="w-full flex justify-between items-center">
                                        <p className="w-2/4 text-green-600 flex items-center justify-center gap-2 p-3 text-md font-medium">
                                            <FaLock size={16} />
                                            <span className="text-sm">With Locker</span>
                                        </p>
                                        <button
                                            className={`w-1/4 flex items-center justify-center p-3 border-l-2 border-greenleast ${scale === 200 ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                            onClick={() => scale < 200 && setScale(scale + 10)}
                                            disabled={scale === 200}
                                        >
                                            <BiSolidZoomIn
                                                className={`text-2xl ${scale === 200 ? "text-gray-400" : "text-greenleast"
                                                    }`}
                                            />
                                        </button>
                                        <button
                                            className={`w-1/4 flex items-center justify-center p-3 border-l-2 border-greenleast ${scale === 10 ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                            onClick={() => scale > 10 && setScale(scale - 10)}
                                            disabled={scale === 10}
                                        >
                                            <BiSolidZoomOut
                                                className={`text-2xl ${scale === 10 ? "text-gray-400" : "text-greenleast"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Layout Fee Table */}
                                <div className="mt-6">
                                    <h2 className="text-xl text-center font-bold text-gray-800 mb-4">
                                        Layout Details
                                    </h2>
                                    <table className="min-w-full max-w-2xl mx-auto border border-gray-300 shadow-md rounded-lg overflow-hidden text-center bg-white">
                                        <thead className="bg-greenleast rounded-t-xl">
                                            <tr>
                                                <th colSpan={2} className="px-6 py-4 text-lg font-semibold text-white">
                                                    Layout Name : <span className="text-white">{data?.layoutName}</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.Fee.map((item, index) => (
                                                <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-3 text-left font-medium text-gray-700">
                                                        Fee for <span className="capitalize">{item.month}</span> Month:
                                                    </td>
                                                    <td className="px-6 py-3 font-bold text-greenleastshade text-right">
                                                        ₹ {item.fee}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Booking Section */}
                                <div className="mt-10">
                                    <h2 className="text-xl text-center font-bold text-gray-800 mb-4">
                                        Book Your Seat
                                    </h2>

                                    {/* Seat Number Select */}
                                    <select
                                        className="w-full p-3 border-2 border-greenleast rounded-md font-semibold mb-6 bg-white shadow-sm"
                                        onChange={(e) => setSeatNumber(e.target.value)}
                                        value={seatNumber}
                                    >
                                        <option value="">Select Seat</option>
                                        {data.seats
                                            .sort((a, b) => +a.seatNumber - +b.seatNumber)
                                            .map(
                                                (item, index) =>
                                                    !item.isBooked &&
                                                    !item.isBlocked && (
                                                        <option key={index} value={item.seatNumber}>
                                                            {item.seatNumber}
                                                        </option>
                                                    )
                                            )}
                                    </select>

                                    {/* Slot Select */}
                                    <select
                                        className="w-full p-3 border-2 border-greenleast rounded-md font-semibold mb-6 bg-white shadow-sm"
                                        onChange={(e) => setSlot(e.target.value)}
                                        value={slot}
                                    >
                                        <option value="">Select Slot</option>
                                        <option value="Morning">Morning</option>
                                        <option value="AfterNoon">AfterNoon</option>
                                        <option value="Night">Night</option>
                                    </select>

                                    {/* Time Period Select */}
                                    <select
                                        className="w-full p-3 border-2 border-greenleast rounded-md font-semibold mb-6 bg-white shadow-sm"
                                        onChange={handleChnageAmount}
                                        value={timePeriod}
                                    >
                                        <option value="">Select Time Period</option>
                                        {data.Fee.map((item, index) => (
                                            <option key={index} value={item.month}>
                                                {item.month} Months
                                            </option>
                                        ))}
                                    </select>

                                    {/* Total */}
                                    <h3 className="text-lg font-bold text-gray-700 mb-6">
                                        Total Payable:{" "}
                                        <span className="font-extrabold text-greenleast">₹ {total}</span>
                                    </h3>

                                    {/* Book Button */}
                                    <button
                                        className="w-full font-bold bg-greenleast hover:bg-greenleastshade transition-all text-white py-3 rounded-lg shadow-md"
                                        onClick={handleBookSeat}
                                    >
                                        Book Seat
                                    </button>
                                </div>
                            </>

                        )
                }
            </section>
        </>
    )
}