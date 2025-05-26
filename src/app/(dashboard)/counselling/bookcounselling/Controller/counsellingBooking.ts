"use client"
import axios from "axios"
import { counselling } from "@/types/types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useIsLoggedIn } from "@/hooks/login"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

const counsellingBooking = () => {
    const [data, setData] = useState<Array<counselling>>()
    const { role, phoneNumber, id, name, email } = useIsLoggedIn()
    const redirect = useRouter();


    const searchParams = useSearchParams();

    // checking if the payment is done or not 
    useEffect(() => {
        const bookseat = async () => {
            const clientTxnId = searchParams.get('client_txn_id');
            const txnDate = searchParams.get('txn_date');
            const userId = searchParams.get('userid');
            const rawcounsellingid = searchParams.get("counsellingid");
            const counsellingid = rawcounsellingid?.split("?")[0]; // This will clean out everything after '?'


            // console.log(timePeriod)
            if (!clientTxnId || !txnDate || !counsellingid || !userId) {
                return
            }

            try {

                console.log(userId)
                const obj = {
                    userId: userId,
                    tnxId: clientTxnId,
                    txnDate: txnDate,
                    counsellingId : counsellingid  
                };

                const response = await axios.patch('/api/counselling/session', obj);

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

    const fetchcounselling = async () => {
        try {
            const res = await axios.get('/api/counselling');

            if (res.status == 200) {
                console.log(res.data)
                setData(res.data)
            } else {
                toast.error(res.data.error)
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        fetchcounselling()
    }, [])




    const handleBookSession = async (amount: string | number, counsellingId: number | string | undefined) => {
        try {
            const body = {
                amount: amount,
                counsellingId: counsellingId,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                userId: id
            };
            const response = await axios.post('/api/payment/createcounslingorder', body);

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


    return {
        data,
        handleBookSession
    }
}

export default counsellingBooking