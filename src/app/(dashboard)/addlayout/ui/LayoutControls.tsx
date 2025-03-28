import seat from '../../../../assets/desk-chair.svg'
import Image from 'next/image';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import React from 'react';
import { layoutDetails } from '@/types/types';
interface LayoutControlsProps {
    handleApplyLayout: (e: React.FormEvent<HTMLFormElement>) => void
    handleChnageSize: (size: string) => void,
    layoutSize: string,
    selectedComponent: string
    setSelectedComponent: (value: string) => void,
    setScale: (value: number) => void
    handleDetailsChange: (e: React.ChangeEvent<HTMLInputElement  |HTMLSelectElement> , index : number | string) => void,
    layoutDetails: layoutDetails,
    handleAddInput: () => void
    months : number[]
}

export const LayoutControls = ({ handleChnageSize, layoutSize, handleApplyLayout, setSelectedComponent, selectedComponent, setScale, handleDetailsChange, layoutDetails, handleAddInput , months }: LayoutControlsProps) => {
    return (
        <div className="py-2 flex-1">
            <h1 className="font-bold mb-4">Layout Type</h1>
            <div className="w-full h-fit flex gap-2 overflow-hidden mb-4 overflow-x-scroll scrollbar">
                <div className="border-[2px] border-greenleast rounded-lg hover:cursor-pointer" onClick={() => handleChnageSize('large')}>
                    <p className={`p-1 px-3 text-sm  ${layoutSize == 'large' ? 'text-white bg-greenleast font-bold' : 'font-medium'}`}>Large</p>
                </div>
                <div className="border-[2px] border-greenleast rounded-lg hover:cursor-pointer" onClick={() => handleChnageSize('medium')}>
                    <p className={`p-1 px-3 text-sm  ${layoutSize == 'medium' ? 'text-white bg-greenleast font-bold' : 'font-medium'}`}>Medium</p>
                </div>
                <div className="border-[2px] border-greenleast rounded-lg hover:cursor-pointer" onClick={() => handleChnageSize('small')}>
                    <p className={`p-1 px-3 text-sm  ${layoutSize == 'small' ? 'text-white bg-greenleast font-bold' : 'font-medium'}`}>Small</p>
                </div>
                <div className="border-[2px]  border-greenleast rounded-lg hover:cursor-pointer" onClick={() => handleChnageSize('costum')}>
                    <p className={`p-1 px-3 text-sm  ${layoutSize == 'costum' ? 'text-white bg-greenleast font-bold' : 'font-medium'}`}>Costum</p>
                </div>
            </div>

            {layoutSize == 'costum' && (
                <div className="mb-6">
                    <h1 className="mb-4 font-bold">Enter No. of Rows and Cols</h1>
                    <form className="flex gap-5" onSubmit={handleApplyLayout}>
                        <input type="number" className="w-24 h-8 rounded-lg p-2 border-2 border-greenleast" placeholder="Row" name="row" />
                        <input type="number" className="w-20 h-8 rounded-lg p-2 border-2 border-greenleast" placeholder="Col" name="col" />
                        <input type="submit" className="w-24 h-8 rounded-lg px-2 font-bold bg-greenleast text-white border-2 border-greenleast cursor-pointer" value="Apply" />
                    </form>
                </div>
            )}

            <div className="mb-6">
                <h1 className="mb-4 font-bold">Components</h1>
                <div className="flex gap-5 overflow-x-scroll scrollbar">
                    <Image src={seat} className={`w-16 h-16 text-greenleast cursor-pointer rounded-lg ${selectedComponent == "seat" ? "border-2 border-greenleast scale-90" : ""}`} alt="seat" onClick={() => setSelectedComponent('seat')} />
                    <div className={`min-w-16 h-16 rounded-md cursor-pointer ${selectedComponent == "box" ? "bg-greenleast scale-90" : "bg-black"}`} onClick={() => setSelectedComponent('box')}></div>
                    <div className={`min-w-16 h-16 rounded-md cursor-pointer border-2 border-black flex items-center justify-center ${selectedComponent == "delete" ? "border-2 border-greenleast scale-90" : ""}`} onClick={() => setSelectedComponent('delete')}>
                        <MdOutlineDeleteOutline className={`text-3xl ${selectedComponent == "delete" ? 'text-greenleast' : ""}`} />
                    </div>
                    <div className={`min-w-16 h-16 rounded-md cursor-pointer border-2 border-black flex items-center justify-center ${selectedComponent == "none" ? "border-2 border-greenleast scale-90" : ""}`} onClick={() => setSelectedComponent('none')}>
                        <AiOutlineStop className={`text-3xl ${selectedComponent == "none" ? 'text-greenleast' : ""}`} />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h1 className="mb-4 font-bold">Zoom</h1>
                <div className="flex gap-10">
                    <input type="range" className="w-[90%] accent-greenleast " min={25} onChange={(e) => setScale(+e.target.value)} />
                </div>
            </div>
            <div className="mb-6">
                <h1 className="mb-4 font-bold">Layout Details</h1>
                <div className="">
                    <label htmlFor="layoutname" className="font-medium">Layout Name*</label>
                    <input type="text" name="layoutName" className="h-10 p-2 w-full rounded-lg  border-2 border-greenleast mb-4" value={layoutDetails.layoutName} onChange={(e)=> handleDetailsChange(e , 'layoutName')} />

                    <label htmlFor="layoutname" className="font-medium">Seat Price Details</label>
                    {
                        layoutDetails.MonthlyFee.map((month, monthindex) => (
                            <div key={monthindex} className='flex gap-4'>
                                <select name="month" id="" className="h-10 p-2 w-[48%] rounded-lg  border-2 border-greenleast mb-4" onChange={(e)=> handleDetailsChange(e , monthindex)} >
                                    <option value="0">Select Months</option>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((months, index) => (
                                            <option key={index} value={months}>{months}</option>
                                        ))
                                    }
                                </select>
                                <input type="text" name="fee" className="h-10 p-2 w-[48%] rounded-lg  border-2 border-greenleast mb-4" placeholder='Enter Amount'  onChange={(e)=> handleDetailsChange(e , monthindex)}/>
                            </div>
                        ))
                    }
                    <button className="bg-greenleast w-full text-white px-5 py-2 rounded-lg font-bold cursor-pointer" onClick={handleAddInput}> Add Months </button>
                </div>
            </div>
        </div>
    )
}

