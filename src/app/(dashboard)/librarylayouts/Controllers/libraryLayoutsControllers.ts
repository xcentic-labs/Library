"use client"
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { layoutdata, newArray } from "@/types/types";
import { useIsLoggedIn } from "@/hooks/login";




interface layoutName {
    id: number,
    layoutName: string
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const libraryLayoutsController = () => {
    const [layoutName, setLayoutNames] = useState<Array<layoutName>>([]);
    const [data, setData] = useState<layoutdata | undefined>();;
    const [isloading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();

    // details
    const [timePeriod, setTimePeriod] = useState('0');
    const [seatNumber, setSeatNumber] = useState<string>()
    const [slot, setSlot] = useState<string>('');


    const [total, setTotal] = useState(0)
    const redirect = useRouter();
    const { id, name, phoneNumber, email } = useIsLoggedIn();
    const [scale, setScale] = useState<number>(100);

    // checking if the payment is done or not 
    useEffect(() => {
        const bookseat = async () => {
            const clientTxnId = searchParams.get('client_txn_id');
            const txnDate = searchParams.get('txn_date');
            const seatNumber = searchParams.get('seatnumber');
            const layoutId = searchParams.get('layoutid');
            const timePeriod = searchParams.get('timeperiod');
            const userId = searchParams.get('userid');
            const rawSlot = searchParams.get("slot");
            const slot = rawSlot?.split("?")[0]; // This will clean out everything after '?'


            // console.log(timePeriod)
            if (!clientTxnId || !txnDate || !layoutId || !seatNumber || !timePeriod || !slot) {
                console.log('faild  here')
                return 
            }

            try {
                
                console.log(userId)
                const obj = {
                    userId: userId,
                    seatNumber: +seatNumber,
                    timePeriod: +timePeriod,
                    slot: slot,
                    layoutId: layoutId,
                    tnxId: clientTxnId,
                    txnDate: txnDate
                };

                console.log("heref once")

                const response = await axios.patch('/api/seat', obj);

                if (response.status === 200) {
                    toast.success(response.data.message);
                    redirect.push('/studentdashboard');
                } else {
                    toast.error(response.data.error);
                }
            } catch (error: any) {
                toast.error("Payment Unsuccessful")
            }
        }
        bookseat();
    }, [])


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
                isLocker: item.isLocker,
                seatNumber: item.seatNumber,
                isBooked: item.isBooked,
                isBlocked: item.isBlocked,
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


    const handleChnageAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimePeriod(e.target.value);
        const month = data?.Fee.filter((item) => {
            return item.month === +(e.target.value)
        })
        !month ? "" : setTotal(month[0].fee)
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
        if (!seatNumber || seatNumber === '0') {
            return toast.error("Select Seat Number");
        }
        if (!timePeriod || timePeriod === '0') {
            return toast.error("Select Time Period");
        }
        const totalAmount = total;

        try {
            const body = {
                amount: totalAmount,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                seatNumber : seatNumber,
                layoutName : layoutName,
                timePeriod : timePeriod,
                slot: slot,
                layoutId : data?.id,
                userId : id
            };

            const response = await axios.post('/api/payment/createseatorder', body);

            if (response.status === 200) {
                toast.success("Order Created Successfully");
                window.location.href = response.data.orderInfo.paymentUrl
            } else {
                toast.error("Failed to create order");
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Error creating order");
        }

    };

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
        timePeriod,
        total,
        handleChnageAmount,
        scale,
        setScale,
        slot,
        setSlot,
    }
}

export default libraryLayoutsController