import React, { useState } from "react";
import { toast } from "react-toastify";
import { layoutDetails, newArray } from "@/types/types";
import axios from "axios";


export const useLayout = () => {
    const [step, setStep] = useState<number>(1);
    const [layoutId, setLayoutId] = useState<number>(0);
    const [selectedComponent, setSelectedComponent] = useState('none');
    const [layoutSize, setLayoutSize] = useState('small');
    const [layout, setLayout] = useState({
        cols: 10,
        rows: 10
    })
    const [scale, setScale] = useState(100);

    const [array, setArray] = useState(new Array((+layout.cols) * (+layout.rows)).fill({
        isSeat: false,
        isBox: false,
    }));

    const [layoutDetails, setLayoutDetails] = useState<layoutDetails>({
        layoutName: "",
        pricePerMonth: 0,
        pricePerWeek: 0
    })

    const [newarray, setNewArray] = useState<Array<newArray>>([])

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
        if (step == 2) return toast.error("Unable To Change The Layout");
        if (selectedComponent == "none") return toast.error("Select an Component");
        setArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = { isSeat: selectedComponent == 'seat' ? true : false, isBox: selectedComponent == 'box' ? true : false };
            return newArray;
        });
    }

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


    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLayoutDetails((prevDetails) => {
            const { name, value } = e.target
            return {
                ...prevDetails,
                [name]: value
            }
        });
    }

    const handleSaveDraft = () => {
        if (!layoutDetails.layoutName) return toast.error("Layout name is Required");
        if (!layoutDetails.pricePerMonth || layoutDetails.pricePerMonth == 0) return toast.error("Price Pre Month is Required");
        if (!layoutDetails.pricePerWeek || layoutDetails.pricePerWeek == 0) return toast.error("Price Pre week is Required");

        const draftLayout = {
            layoutName: layoutDetails.layoutName,
            layoutDetails: layoutDetails,
            layout: layout,
            array: array
        }

        const prev: any = localStorage.getItem('Draft-layout');
        const arr = JSON.parse(prev) || [];

        arr.push(draftLayout);

        localStorage.setItem(`Draft-layout`, JSON.stringify(arr));
        setLayoutDetails({
            layoutName: "",
            pricePerMonth: 0,
            pricePerWeek: 0
        });
        setStep(1);
        handleChnageSize('small')

        return toast.success(`${layoutDetails.layoutName} Saved`)
    }

    const handelNextStep = async () => {
        if (!layoutDetails.layoutName) return toast.error("Layout name is Required");
        if (!layoutDetails.pricePerMonth || layoutDetails.pricePerMonth == 0) return toast.error("Price Pre Month is Required");
        if (!layoutDetails.pricePerWeek || layoutDetails.pricePerWeek == 0) return toast.error("Price Pre week is Required");

        const arr = array.map((item, index) => {
            if (item.isSeat || item.isBox) {
                return {
                    index: index,
                    isSeat: item.isSeat,
                    isBox: item.isBox,
                    isLocker: true,
                    seatNumber: undefined
                }
            }
        }).filter((item) => {
            return item !== undefined
        })

        const boxarray = arr.map((item) => {
            if (item.isBox) {
                return item.index
            }
        }).filter((item) => {
            return item != undefined
        })


        const seatarray = arr.filter((item) => {
            return item.isSeat
        })

        if (arr.length == 0) return toast.error("No Layout has been Created");

        const data = {
            layoutName: layoutDetails.layoutName,
            layoutCols: layout.cols,
            layoutRows: layout.rows,
            pricePerMonth: (+layoutDetails.pricePerMonth),
            pricePerWeek: (+layoutDetails.pricePerWeek),
            boxesAt: JSON.stringify(boxarray)
        }

        try {
            const res = await axios.post('/api/layout', JSON.stringify(data));

            if (res.status == 201) {
                setNewArray(seatarray);
                setStep(2);
                setLayoutId(res.data.layout.id);
                return toast.success(`${layoutDetails.layoutName} Saved Sucessfully`)
            }
            else {
                toast.error(res.data.error);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }

    const handleUpdateSeatDetails = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewArray((prevArray) => {
            const newArray = [...prevArray]
            name === "isLocker" ? newArray[index] = { ...newArray[index], isLocker: value == "yes" ? true : false } : newArray[index] = { ...newArray[index], [name]: value }
            return newArray
        })
    }


    const handleAddseats = async () => {
        console.log(newarray)
        const arr = newarray.filter((item) => {
            return item.seatNumber == undefined || !item.seatNumber;
        });

        if (arr.length != 0) return toast.error(`Seat Number can't be empty at index ${arr[0]?.index}`);

        const data = newarray.map((item) => {
            return {
                seatNumber: Number(item.seatNumber),
                isLocker: item.isLocker,
                index: item.index,
                layoutId: layoutId
            }
        })

        console.log(data);

        try {
            const res = await axios.post('/api/seat', JSON.stringify(data))

            if (res.status == 201) {
                toast.success("Seats Added sucessfully");

            } else {
                toast.error(res.data.error);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }

    return {
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
        layoutDetails,
        setLayoutDetails,
        handleDetailsChange,
        handelNextStep,
        step,
        newarray,
        handleUpdateSeatDetails,
        handleAddseats
    }
}