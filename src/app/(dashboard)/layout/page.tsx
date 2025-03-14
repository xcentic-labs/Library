"use client"

import React from "react";
import { useLayout } from "./hooks/layout";
import { LayoutGrid } from "./ui/LayoutGrid";
import { LayoutControls } from "./ui/LayoutControls";


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
        handleSaveDraft
    } = useLayout()

    return (
        <section className="w-full h-full flex justify-between items-center">
            <div className="w-[65%] h-full  p-20 overflow-scroll scrolbar">
                <LayoutGrid array={array} scale={scale} layout={layout} handleSeatPickUp={handleSeatPickUp} />
            </div>
            <div className="w-[35%] h-full flex flex-col bg-white p-4">    

                <LayoutControls handleChnageSize={handleChnageSize} layoutSize={layoutSize}   selectedComponent={selectedComponent}  setSelectedComponent={setSelectedComponent} setScale={setScale} handleApplyLayout={handleApplyLayout} />

                <div className="flex w-full justify-between items-center py-2 gap-4">
                    <button className="bg-greenleast w-1/2 text-white px-5 py-2 rounded-lg font-bold cursor-pointer" onClick={handleSaveDraft}>Save Draft</button>
                    <button className="bg-greenleast w-1/2 text-white px-5 py-2 rounded-lg font-bold cursor-pointer">Next</button>
                </div>
            </div>
        </section>
    )
}