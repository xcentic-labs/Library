"use client"
import { getLayoutDetails } from "../layouts/[id]/Controller/getLayoutDetails"
import LayoutGrid from "../layouts/[id]/UI/LayoutGrid"
import libraryLayoutsController from "./Controllers/libraryLayoutsControllers"


export default function StudentLayout() {
    const {
        redirect, layoutName, handleChnageLayout, data, generatearray, setTimePeriod, setSeatNumber , handleBookSeat , seatNumber , timePeriod
    } = libraryLayoutsController()

    return (
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
                            <div className="w-full sm:h-full h-[30rem]  p-20 overflow-scroll scrollbar border-[4px] border-greenleast rounded-b-2xl mb-4 z-10">
                                {
                                    !data ?
                                        ""
                                        :
                                        <LayoutGrid rows={data.layoutCols} cols={data.layoutRows} array={generatearray(data)} scale="100%" />
                                }
                            </div>
                            <div className="mb-4">
                                <h1 className="text-xl w-full text-center text-black font-bold capitalize rounded-t-2xl py-2 mb-4">Layout Details</h1>
                                <h1 className="text-lg w-full text-black font-bold capitalize mb-1">Layout Name : <span className="text-lg w-full text-black font-semibold capitalize"> {data?.layoutName}</span></h1>
                                <h1 className="text-lg w-full text-black font-bold capitalize mb-1">Monthly Fee : <span className="text-lg w-full text-black font-semibold capitalize"> ₹ {data?.pricePerMonth}</span></h1>
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

                                <select name="seatNumber" className="w-full p-2 border-2 border-greenleast rounded-md  font-bold mb-8" onChange={(e) => setTimePeriod(e.target.value)} value={timePeriod}>
                                    <option value="">Select Time Period</option>
                                    <option value="1">1 Month</option>
                                    <option value="3">3 Month</option>
                                    <option value="6">6 Month</option>
                                    <option value="12">12 Month</option>
                                </select>
                                <button className="w-full font-bold bg-greenleast py-2 rounded-lg text-white" onClick={()=> handleBookSeat()}>Book Seat</button>
                            </div>

                        </>
                    )
            }
        </section>
    )
}