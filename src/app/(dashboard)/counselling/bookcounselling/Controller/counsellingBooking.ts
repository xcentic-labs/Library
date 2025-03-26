"use client"
import axios from "axios"
import { counselling } from "@/types/types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify/unstyled"
import { useIsLoggedIn } from "@/hooks/login"
import { useRouter } from "next/navigation"

const counsellingBooking = () => {
    const [data, setData] = useState<Array<counselling>>()
    const { role, phoneNumber , id , name } = useIsLoggedIn()
    const redirect = useRouter();

    

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


    const handleBookSession = async (amount: string | number , Counselling : counselling) => {

        const orderId = await createOrder((+amount)*100);

        if (!orderId) return toast.error("Unable to create Order");

        const options = {
            key: process.env.key_id,
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


    return {
        data,
        handleBookSession
    }
}

export default counsellingBooking