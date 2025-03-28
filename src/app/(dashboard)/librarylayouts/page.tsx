"use client"
import LayoutGrid from "../layouts/[id]/UI/LayoutGrid"
import libraryLayoutsController from "./Controllers/libraryLayoutsControllers"
import Script from "next/script"
import { BiSolidZoomIn, BiSolidZoomOut } from "react-icons/bi";
import { FaLock } from "react-icons/fa";



export default function StudentLayout() {
    const {
        redirect, layoutName, handleChnageLayout, data, generatearray, setTimePeriod, setSeatNumber, handleBookSeat, seatNumber, timePeriod, total, handleChnageAmount, scale, setScale
    } = libraryLayoutsController()

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <section className="w-full h-full md:p-10 p-5 overflow-y-scroll scrollbar">
                <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer" onClick={() => redirect.push('/dashboard')}>Dashboard</span> / Layout</h1>
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
                                <h1 className="text-xl w-full text-center bg-greenleast  text-white font-bold capitalize rounded-t-2xl py-2 ">Layout Design</h1>
                                <div className="w-full sm:h-full h-[30rem] p-2 sm:p-10  md:p-20 overflow-scroll scrollbar border-[4px] border-greenleast relative">
                                    {
                                        !data ?
                                            ""
                                            :
                                            <LayoutGrid cols={data.layoutCols} rows={data.layoutRows} array={generatearray(data)} scale={scale} />
                                    }
                                </div>
                                <div className="flex  h-fit  border-[4px] border-greenleast rounded-b-2xl bg-white border-t-0" >
                                    <div className="w-full h-full flex justify-between items-center ">
                                        <p className={`w-2/4 h-full text-green-600 flex text-md p-2  justify-center items-center gap-2`}>
                                            <FaLock size={16} /> <samp className="text-xs">With Locker</samp>
                                        </p>
                                        <button className={`w-1/4 h-full flex items-center justify-center border-l-[3px] border-greenleast p-2 ${scale === 200 ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => scale == 200 ? "" : setScale(scale + 10)} disabled={scale == 200} >
                                            <BiSolidZoomIn className={`text-2xl  ${scale === 200 ? "opacity-50 cursor-not-allowed text-gray-500" : "text-greenleast"}`} />
                                        </button>
                                        <button className={`w-1/4 h-full flex items-center justify-center border-l-[3px] border-greenleast p-2 ${scale === 10 ? "opacity-50 cursor-not-allowed text-gray-500" : ""}`} onClick={() => scale == 10 ? "" : setScale(scale - 10)} disabled={scale == 10}>
                                            <BiSolidZoomOut className={`text-2xl  ${scale === 200 ? "opacity-50 cursor-not-allowed text-gray-500" : "text-greenleast"}`} />
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h1 className="text-xl w-full text-center text-black font-bold capitalize rounded-t-2xl py-2 mb-4">Layout Details</h1>
                                    <h1 className="text-lg w-full text-black font-bold capitalize mb-1">Layout Name : <span className="text-lg w-full text-black font-semibold capitalize"> {data?.layoutName}</span></h1>
                                    <h1 className="text-lg w-full text-black font-bold capitalize mb-1">Fee Structure :-</h1>
                                    {
                                        data.Fee.map((item, index) => (
                                            <p key={index} className="font-semibold">Fee for {item.month} Month : <span className="w-full text-black font-medium capitalize">₹ {item.fee}</span></p>
                                        ))
                                    }
                                </div>
                                <div>
                                    <h1 className="text-xl w-full text-center text-black font-bold capitalize rounded-t-2xl py-2 mb-4">Book Your Seat</h1>
                                    <select name="seatNumber" id="" className="w-full p-2 border-2 border-greenleast rounded-md  font-bold mb-8" onChange={(e) => setSeatNumber(e.target.value)} value={seatNumber} >
                                        <option value="">Select Seat</option>
                                        {
                                            data.seats.sort((a, b) => {
                                                return (+a.seatNumber) - (+b.seatNumber)
                                            }).map((item, index) => (
                                                item.isBooked || item.isBlocked ? "" : <option key={index} value={item.seatNumber}>{item.seatNumber}</option>
                                            ))

                                        }
                                    </select>

                                    <select name="seatNumber" className="w-full p-2 border-2 border-greenleast rounded-md  font-bold mb-8" onChange={(e) => handleChnageAmount(e)} value={timePeriod}>
                                        <option value="">Select Time Period</option>
                                        {
                                            data.Fee.map((item, index) => (
                                                <option key={index} value={item.month}>{`${item.month} Months`}</option>
                                            ))
                                        }
                                    </select>
                                    <h1 className="text-lg w-full text-black font-bold capitalize mb-8">Total Payable : <span className="text-lg w-full text-black font-semibold capitalize">₹ {total}</span></h1>
                                    <button className="w-full font-bold bg-greenleast py-2 rounded-lg text-white" onClick={() => handleBookSeat()}>Book Seat</button>
                                </div>

                            </>
                        )
                }
            </section>
        </>
    )
}