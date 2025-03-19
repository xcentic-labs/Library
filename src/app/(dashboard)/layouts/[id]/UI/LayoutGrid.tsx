"use client"
import Image from "next/image"
import seat from '@/assets/desk-chair.svg'
import { newArray } from "@/types/types";



interface LayoutGridProps {
    cols : number,
    rows : number,
    array: newArray[];
}

export default function LayoutGrid({cols , rows , array } : LayoutGridProps) {

    return (
        <div className={`w-fit h-fit gap-1 bg-white/80 p-2 grid z-10`} style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}>
            {
                array.map((item, index) => (
                    <div key={index} className="border-dotted border-2 flex items-center justify-center w-16 h-16 cursor-pointer" style={{ zIndex : 0}}>
                        {
                            item.isSeat ?
                                (
                                    <div className="relative z-10">
                                        <p className="absolute z-10 text-greenleast text-xs">{item.seatNumber}</p>
                                        <Image src={seat} className="w-12 h-12 cursor-pointer z-10" alt="seat" />
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