import { Arapey } from "next/font/google";
import { useState } from "react";
import { toast } from "react-toastify";

export const useLayout = () => {
    const [selectedComponent, setSelectedComponent] = useState('none')
    const [layoutSize, setLayoutSize] = useState('small');
    const [layout, setLayout] = useState({
        cols: 10,
        rows: 10
    })
    const [scale, setScale] = useState(100)
    const [array, setArray] = useState(new Array((+layout.cols) * (+layout.rows)).fill({
        isSeat: false,
        isBox: false,
    }));

    const handleChnageSize = (size: string) => {
        switch (size) {
            case 'large':
                handleLayoutChange(20, 20)
                setLayoutSize('large')
                break;
            case 'medium':
                handleLayoutChange(15, 15)
                setLayoutSize('medium')
                break;
            case 'small':
                handleLayoutChange(10, 10)
                setLayoutSize('small')
                break;
            case 'costum':
                setLayoutSize('costum')
                break;
        }
    }

    const handleSeatPickUp = (index: number) => {
        if (selectedComponent == "none") return toast.error("Select an Component");

        setArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = { isSeat: selectedComponent == 'seat' ? true : false, isBox: selectedComponent == 'box' ? true : false };
            return newArray;
        });
    }

    console.log(array);
    const handleLayoutChange = (col: number, row: number) => {
        setArray(new Array((col) * (row)).fill({
            isSeat: false,
            isBox: false,
        }))
        setLayout({
            cols: (col),
            rows: (row)
        });
    }

    const handleApplyLayout = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const rowInput = form.row as HTMLInputElement | null;
        const colInput = form.col as HTMLInputElement | null;

        if (!rowInput?.value || (+rowInput.value) == 0) return toast.error("enter no of rows")
        if (!colInput?.value || (+colInput.value) == 0) return toast.error("enter no of rows");

        handleLayoutChange(+colInput.value, +rowInput.value);
    }

    const handleSaveDraft = ()=>{
        const draftLayout = {
            layout : layout,
            array : array
        }
        localStorage.setItem('draftLayout' , JSON.stringify(draftLayout));
    }


    return{
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
    }
}