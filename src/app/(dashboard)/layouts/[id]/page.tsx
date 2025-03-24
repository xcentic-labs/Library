"use client"
import { seatbody } from "@/types/types";
import { getLayoutDetails } from "./Controller/getLayoutDetails"
import LayoutGrid from "./UI/LayoutGrid";
import LayoutSeatList from "./UI/LayoutSeatList";

export default function LayoutDetails() {
    const {
        data,
        redirect,
        generatearray,
        formatDate
    } = getLayoutDetails();



    return (


        <div className="w-full h-[90vh]  overflow-y-scroll scrollbar md:p-10 p-3">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer" onClick={() => redirect.push('/dashboard')}>Dashboard</span> / Layout / {!data ? "Unknown" : data.layoutName}</h1>
            {
                !data ?
                    ""
                    :
                    <>
                        <h1 className="text-xl w-full text-center bg-greenleast  text-white font-bold capitalize rounded-t-2xl py-2">Layout Design</h1>
                        <div className="w-full sm:h-full h-[30rem]  p-20 overflow-scroll scrollbar border-[4px] border-greenleast rounded-b-2xl mb-7 z-10">
                            <LayoutGrid cols={data.layoutCols} rows={data.layoutRows} array={generatearray(data)} scale="100%" />
                        </div>
                        <div className="w-full h-fit">
                            <LayoutSeatList data={data.seats.sort((a: seatbody, b: seatbody) => {
                                return (+a.seatNumber) - (+b.seatNumber);
                            })}
                                formatDate={formatDate}
                            />
                        </div>
                    </>
            }
        </div>
    )
}