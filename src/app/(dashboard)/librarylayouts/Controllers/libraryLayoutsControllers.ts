"use client"
import axios from "axios";
import { useRouter } from "next/navigation"
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
    const [timePeriod, setTimePeriod] = useState('0');
    const [seatNumber, setSeatNumber] = useState<string>()
    const [total, setTotal] = useState(0)
    const redirect = useRouter();
    const { id, name, phoneNumber } = useIsLoggedIn();


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
                isBooked: item.isBooked,
                isBlocked : item.isBlocked,
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
        const month  = data?.Fee.filter((item)=>{
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

        if (!seatNumber || seatNumber == '0') return toast.error("Selaect Seat Number");
        if (!timePeriod || timePeriod == '0') return toast.error("Selaect Time Period");
        const totalAmount = total * 100;

        const orderId = await createOrder(totalAmount);

        if (!orderId) return toast.error("Unable to create Order");

        const options = {
            key: process.env.key_id,
            amount: total,
            currency: 'INR',
            name: name,
            description: `Seat Numbaer : ${seatNumber} for ${timePeriod} Months`,
            order_id: orderId,
            handler: async function bookseat(response: any) {
                try {
                    const obj = {
                        userId: id,
                        seatNumber: +(seatNumber),
                        timePeriod: +(timePeriod),
                        layoutId: data?.id,
                        razorpayOrderId : response.razorpay_order_id,
                        razorpayPaymentId : response.razorpay_payment_id,
                        razorpaySignature : response.razorpay_signature,

                    }
                    const res = await axios.patch('/api/seat', JSON.stringify(obj));

                    if (res.status == 200) {
                        toast.success(res.data.message);
                        redirect.push('/studentdashboard')
                    } else {
                        toast.error(res.data.error)
                    }
                } catch (error: any) {
                    toast.error(error.response.data.error)
                }
            },
            prefill: {
                name: name,
                phoneNumber: phoneNumber
            },
            theme: {
                color: '#1c3f3a',
            },
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response: any) {
            alert(response.error.description);
        });
        paymentObject.open();
    }


    const createOrder = async (amount: string | number) => {
        try {
            const body = {
                amount: amount,
                currency: 'INR'
            }
            const response = await axios.post('/api/payment/createorder', JSON.stringify(body));

            if (response.status == 200) {
                toast.success("Order Created Sucessfully");
                console.log(response.data);
                return response.data.orderId
            }
            else {
                return ""
            }
        } catch (error: any) {
            console.log(error);
            return ""
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
        timePeriod,
        total,
        handleChnageAmount
    }
}

export default libraryLayoutsController