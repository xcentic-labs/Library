"use client"
import { getLayoutDetails } from "../layouts/[id]/Controller/getLayoutDetails"
import LayoutGrid from "../layouts/[id]/UI/LayoutGrid"
import libraryLayoutsController from "./Controllers/libraryLayoutsControllers"
import Script from "next/script"


export default function StudentLayout() {
    const {
        redirect, layoutName, handleChnageLayout, data, generatearray, setTimePeriod, setSeatNumber, handleBookSeat, seatNumber, timePeriod, total, handleChnageAmount
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
                                <h1 className="text-xl w-full text-center bg-greenleast  text-white font-bold capitalize rounded-t-2xl py-2">Layout Design</h1>
                                <div className="w-full sm:h-full h-[30rem]  p-20 overflow-scroll scrollbar border-[4px] border-greenleast rounded-b-2xl mb-4">
                                    {
                                        !data ?
                                            ""
                                            :
                                            <LayoutGrid cols={data.layoutCols} rows={data.layoutRows} array={generatearray(data)} scale="100%" />
                                    }
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
                                            data.seats.map((item, index) => (
                                                item.isBooked ? "" : <option key={index} value={item.seatNumber}>{item.seatNumber}</option>
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