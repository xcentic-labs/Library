import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prismaClient";

export async function POST(res: NextRequest) {
    try {
        const body = await res.json();
        const { amount, name, email, phoneNumber, counsellingId  , userId } = body as {
            amount: string,
            counsellingId : string | number,
            name: string,
            email: string,
            phoneNumber: string,
            userId : number | string
        }

        const tnx_id = 'PC_' + Date.now()
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        const options = {
            "key": process.env.upi_gataway_api_key,
            "client_txn_id": tnx_id,
            "amount": `${amount}`,
            "p_info": `For Counselling`,
            "customer_name": name,
            "customer_email": email,
            "customer_mobile": phoneNumber,
            "redirect_url": `http://10.21.97.44:3000/counselling/bookcounselling?client_txn_id=${tnx_id}&txn_date=${day}-${month}-${year}&userid=${userId}&counsellingid=${counsellingId}`,
        }

        if (!amount) return NextResponse.json({ "error": "All fields are required" }, { status: 400 })

        const response = await axios.post('https://api.ekqr.in/api/create_order', options);

        if (!response) return NextResponse.json({ "error": "Unable to place Your Order" }, { status: 500 });

        if (response.data.status == true) {

            await prisma.paymentverification.create({
                data : {
                    tnx_id : tnx_id
                }
            });

            return NextResponse.json({
                "message": "Order placed Sucessfully", orderInfo: {
                    user: {
                        name: name,
                        phoneNumber: phoneNumber,
                        email: email
                    },
                    client_txn_id: tnx_id,
                    txn_date : `${day}-${month}-${year}`,
                    paymentUrl : response.data.data.payment_url
                }
            }, { status: 200 })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to place Your Order Internal server error" }, { status: 500 });
    }
}