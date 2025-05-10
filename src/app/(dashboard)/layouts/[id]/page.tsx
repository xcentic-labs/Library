"use client"
import { seatbody } from "@/types/types";
import { getLayoutDetails } from "./Controller/getLayoutDetails"
import LayoutGrid from "./UI/LayoutGrid";
import LayoutSeatList from "./UI/LayoutSeatList";
import { BiSolidZoomIn, BiSolidZoomOut } from "react-icons/bi";
import { FaLock } from "react-icons/fa";


export default function LayoutDetails() {
    const {
        data,
        redirect,
        generatearray,
        formatDate,
        handleAllotment,
        handleUpdateBlockStatus,
        scale,
        setScale
    } = getLayoutDetails();



    return (


        <div className="w-full h-[90vh]  overflow-y-scroll scrollbar md:p-10 p-3">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer" onClick={() => redirect.push('/admindashboard')}>Dashboard</span> / Layout / {!data ? "Unknown" : data.layoutName}</h1>
            {
                !data ?
                    ""
                    :
                    <>
                        <h1 className="text-xl w-full text-center bg-greenleast  text-white font-bold capitalize rounded-t-2xl py-2">Layout Design</h1>
                        <div className="w-full sm:h-full h-[30rem]  p-20 overflow-scroll scrollbar border-[4px] border-greenleast z-10">
                            <LayoutGrid cols={data.layoutCols} rows={data.layoutRows} array={generatearray(data)} scale={scale} />
                        </div>
                        <div className="flex  h-fit  border-[4px] border-greenleast rounded-b-2xl bg-white border-t-0 mb-10">
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
                        <div className="w-full h-fit">
                            <LayoutSeatList data={data.seats.sort((a: seatbody, b: seatbody) => {
                                return (+a.seatNumber) - (+b.seatNumber);
                            })}
                                formatDate={formatDate}
                                handleAllotment={handleAllotment}
                                handleUpdateBlockStatus={handleUpdateBlockStatus}
                            />
                        </div>
                    </>
            }
        </div>
    )
}