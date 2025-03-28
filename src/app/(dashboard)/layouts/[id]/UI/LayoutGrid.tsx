"use client"
import Image from "next/image"
import seat from '@/assets/desk-chair.svg'
import bookedSeat from '@/assets/booketseat.svg'
import { newArray } from "@/types/types";
import { FaLock } from "react-icons/fa";




interface LayoutGridProps {
    cols: number,
    rows: number,
    array: newArray[];
    scale: string
}

export default function LayoutGrid({ cols, rows, array, scale = '100%' }: LayoutGridProps) {

    return (
        <div className={`w-fit h-fit gap-1 bg-white/80 p-2 grid z-10`} style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            scale: `${scale}`
        }}>
            {
                array.map((item, index) => (
                    <div key={index} className={`border-dotted border-2 flex items-center justify-center w-16 h-16 cursor-pointer ${item.isBooked || item.isBlocked ? 'bg-slate-300' : 'bg-transparent'}`} style={{ zIndex: 0 }}>
                        {
                            item.isSeat ?
                                (
                                    <div className={`relative z-10 `}>
                                        <p className={`absolute z-10 text-greenleast text-xs  ${item.isBooked || item.isBlocked ? 'opacity-50 text-slate-600' : 'opacity-100'}`}>{item.seatNumber}</p>
                                        <Image src={item.isBooked || item.isBlocked ? bookedSeat : seat} className={`w-12 h-12 cursor-pointer z-10 ${item.isBooked || item.isBlocked ? 'opacity-50' : 'opacity-100'}`} alt="seat" />
                                        <p className={`absolute z-10 top-0 -right-1 ${item.isLocker ? 'text-green-600' : "text-red-600"}  text-[10px]  ${item.isBooked || item.isBlocked ? 'opacity-50 text-slate-600' : 'opacity-100'}`}>
                                            <FaLock />
                                        </p>
                                    </div>
                                )
                                :
                                item.isBox ?
                                    <div className="w-16 h-16 bg-black rounded-md cursor-pointer scale-95 z-10"></div>
                                    :
                                    ""
                        }
                    </div>
                ))
            }
        </div>
    )
}