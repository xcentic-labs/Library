"use client"
import axios from "axios";
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { layoutdata, newArray } from "@/types/types";
import { useIsLoogedIn } from "@/hooks/login";

interface layoutName {
    id: number,
    layoutName: string
}

export const libraryLayoutsController = () => {
    const [layoutName, setLayoutNames] = useState<Array<layoutName>>([]);
    const [data, setData] = useState<layoutdata | undefined>();;
    const [isloading, setIsLoading] = useState(false);
    const [timePeriod, setTimePeriod] = useState('0');
    const [seatNumber, setSeatNumber] = useState<string>()
    const [total, setTotal] = useState(0)
    const redirect = useRouter();
    const { id } = useIsLoogedIn();


    const fetchLayoutNames = async () => {
        try {
            const response = await axios.get('/api/layout/layoutname')
            if (response.status == 200) {
                setLayoutNames(response.data);
                console.log(response.data);
            } else {
                toast.error(response.data.error)
            }
        } catch (error: any) {
            toast.error(error.response.data.error)
        }
    }

    const generatearray = (data: layoutdata) => {
        let array: newArray[] = !data ? [] : new Array(data?.layoutCols * data?.layoutRows).fill({
            id: null,
            index: null,
            isSeat: false,
            isBox: false,
            isLocker: true,
            seatNumber: null
        });

        data?.seats.forEach((item) => {
            array[item.index] = {
                id: item.id,
                index: item.index,
                isSeat: true,
                isBox: false,
                isLocker: true,
                seatNumber: item.seatNumber,
                isBooked: item.isBooked
            };
        });

        const boxarray: number[] = !data ? [] : JSON.parse(data?.boxesAt);

        array = array.map((item, index) => ({
            ...item,
            isBox: boxarray.includes(index),
        }));

        return array;
    }

    const fetchLayoutDetails = async (layoutId: number) => {
        try {
            const res = await axios.get(`/api/layout/${layoutId}`);

            if (res.status == 200) {
                console.log(res.data.data)
                setData(res.data.data);
            } else {
                setIsLoading(false);
                toast.error(res.data.error);
            }
        } catch (error: any) {
            setIsLoading(false);
            console.log("")
            toast.error(error.response.data.error);
        }
    }


    const handleChnageLayout = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        if (+(e.target.value) == 0 || e.target.value == undefined) {
            return
        };

        setSeatNumber('');
        setTimePeriod('');

        fetchLayoutDetails(+(e.target.value));
    }

    const handleBookSeat = async () => {

        if (!seatNumber || seatNumber == '0') return toast.error("Selaect Seat Number");
        if (!timePeriod || timePeriod == '0') return toast.error("Selaect Time Period");

        console.log(seatNumber)
        const obj = {
            userId: id,
            seatNumber: +(seatNumber),
            timePeriod: +(timePeriod),
            layoutId: data?.id
        }

        try {
            const response = await axios.patch('/api/seat', JSON.stringify(obj));

            if (response.status == 200) {
                console.log(response.data);
                toast.success(response.data.message);
                redirect.push('/studentdashboard')
            } else {
                toast.error(response.data.error)
            }
        } catch (error: any) {
            toast.error(error.response.data.error)
        }
    }


    useEffect(() => {
        fetchLayoutNames();
    }, []);

    return {
        redirect,
        layoutName,
        handleChnageLayout,
        data,
        generatearray,
        setTimePeriod,
        setSeatNumber,
        handleBookSeat,
        seatNumber,
        timePeriod
    }
}

export default libraryLayoutsController