"use client"
import axios from "axios"
import { counselling } from "@/types/types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify/unstyled"
import { useRouter } from "next/navigation"
import { useIsLoggedIn } from "@/hooks/login"

interface userInfo{
    phoneNumber : string | null ,
    id : string | number,
    name : string | null
}

const counsellingBooking = () => {
    const [data, setData] = useState<Array<counselling>>()
    const [userInfo , setUserInfo] = useState<userInfo>({
        phoneNumber: "",
        id : "",
        name : ""
    })
    const redirect = useRouter();
    const { id, name, phoneNumber } = useIsLoggedIn();

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



    const createOrder = async (amount: string | number) => {
        try {
            const body = {
                amount: amount,
                currency: 'INR'
            }
            const response = await axios.post('/api/payment/createorderrzp', JSON.stringify(body));

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


    const handleBookSession = async (amount: string | number , Counselling : counselling) => {

        const orderId = await createOrder((+amount)*100);

        if (!orderId) return toast.error("Unable to create Order");

        const options = {
            key: 'rzp_live_SrGzm9Jp9WZRyX',
            amount: (+amount)*100,
            currency: 'INR',
            name: name,
            description: `Booking an ${Counselling.name} for  ₹ ${amount}`,
            order_id: orderId,
            handler: async function bookseat(response: any) {
                try {
                    const obj = {
                        userId: id,
                        counsellingId: Counselling.id ,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,

                    }
                    const res = await axios.post('/api/counselling/session', JSON.stringify(obj));

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
                name: userInfo.name,
                phoneNumber: userInfo.phoneNumber
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


    return {
        data,
        handleBookSession
    }
}

export default counsellingBooking