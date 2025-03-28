import { newArray } from "@/types/types"
import React from "react"


interface seatDetailsProps {
    array: Array<newArray>
    handleUpdateSeatDetails : (index : number ,  e : React.ChangeEvent<HTMLInputElement |HTMLSelectElement>) => void;
}

const SeatDetails = ({ array , handleUpdateSeatDetails }: seatDetailsProps) => {
    return (
        <div className="py-2 flex-1">
            <h1 className="font-bold mb-4">Seat Details</h1>
            {
                array.map((item, index) => (
                    item.isSeat && (
                        <div key={index} className="w-full h-fit border-2 border-black p-2 rounded-xl shadow-lg mb-6">
                            <h4 className="mb-2">Seat At Index {item.index}</h4>
                            <div className=" flex flex-wrap justify-between px-2">
                                <div className="w-[40%]" >
                                    <label htmlFor="" className="">Seat Number</label>
                                    <input type="text" name="seatNumber" className="h-8 w-full p-2  rounded-md  border-2 border-greenleast" onChange={(e)=> handleUpdateSeatDetails(index , e)}  />
                                </div>
                                <div className="w-[40%]">
                                    <label className="block">Locker Available?</label>
                                    <select name="isLocker" id="" className="w-full h-8 rounded-md  border-2 border-greenleast" onChange={(e) => handleUpdateSeatDetails(index , e) } >
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )
                ))
            }
        </div>
    )
}

export default SeatDetails