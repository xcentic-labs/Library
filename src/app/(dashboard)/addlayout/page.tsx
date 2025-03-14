"use client"

import React from "react";
import { useLayout } from "./LayoutControllers/layout";
import { LayoutGrid } from "./ui/LayoutGrid";
import { LayoutControls } from "./ui/LayoutControls";
import SeatDetails from "./ui/SeatDetails";


export default function Layout() {

    const {
        selectedComponent,
        setSelectedComponent,
        layoutSize,
        layout,
        scale,
        setScale,
        array,
        handleSeatPickUp,
        handleChnageSize,
        handleApplyLayout,
        handleSaveDraft,
        handleDetailsChange,
        layoutDetails,
        handelNextStep,
        step,
        newarray,
        handleUpdateSeatDetails,
        handleAddseats
    } = useLayout()

    return (
        <section className="w-full h-full flex justify-between items-center">
            <div className="w-[65%] h-full  p-20 overflow-scroll scrolbar">
                <LayoutGrid array={array} scale={scale} layout={layout} handleSeatPickUp={handleSeatPickUp} />
            </div>
            <div className="w-[35%] h-full flex flex-col bg-white p-4 overflow-y-scroll scrolbar">

                {
                    step == 1 ?
                        <LayoutControls handleChnageSize={handleChnageSize} layoutSize={layoutSize} selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} setScale={setScale} handleApplyLayout={handleApplyLayout} handleDetailsChange={handleDetailsChange} layoutDetails={layoutDetails} />
                        :
                        <SeatDetails array={newarray} handleUpdateSeatDetails={handleUpdateSeatDetails} />
                }

                <div className="flex w-full justify-between items-center py-2 gap-4">
                    {
                        step == 1 ?
                            <button className="bg-greenleast w-1/2 text-white px-5 py-2 rounded-lg font-bold cursor-pointer" onClick={handleSaveDraft}>Save Draft</button>
                            :
                            ""
                    }
                    <button className="bg-greenleast w-1/2 text-white px-5 py-2 rounded-lg font-bold cursor-pointer" onClick={step == 1 ? handelNextStep : handleAddseats}>
                        {
                            step == 1 ? "Next" : "Submit"
                        }
                    </button>
                </div>
            </div>
        </section>
    )
}