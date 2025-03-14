import seat from '../../../../assets/desk-chair.svg'
import Image from 'next/image';
interface LayoutGridProps {
    layout: { cols: number; rows: number };
    scale: number;
    array: { isSeat: boolean; isBox: boolean }[];
    handleSeatPickUp: (index: number) => void;
}

export const LayoutGrid = ({ array, layout, scale, handleSeatPickUp }  : LayoutGridProps) => {
    return (
        <div className={`w-fit h-fit gap-1 bg-white/80 p-2  grid `} style={{
            gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
            gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
            scale: `${scale}%`
        }}>
            {
                array.map((item, index) => (
                    <div key={index} className="border-dotted border-2 flex items-center justify-center w-16 h-16 cursor-pointer" onClick={() => handleSeatPickUp(index)}>
                        {
                            item.isSeat ?
                                (
                                    <div className=" relative">
                                        {/* <p className="absolute text-greenleast text-xs">{item?.seatNumber}</p> */}
                                        <Image src={seat} className="w-12 h-12 cursor-pointer" alt="seat" />
                                    </div>
                                )
                                : item.isBox ? <div className="w-16 h-16 bg-black rounded-md cursor-pointer scale-95"></div> : ""
                        }
                    </div>
                ))
            }
        </div>
    )
}