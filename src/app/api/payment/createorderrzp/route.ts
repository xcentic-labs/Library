import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function POST(res : NextRequest) {
    try {
        const body = await res.json();
        const {amount , currency} = body as {
            amount : string,
            currency  :string
        }

        if(!amount || !currency) return NextResponse.json({"error" : "All fields are required"},{status : 400})

        const options = {
            amount : amount,
            currency : currency,
            receipt : 'repit_07'
        }

        const order = await razorpay.orders.create(options);
        if(!order) return NextResponse.json({"error" : "Unable to place Your Order"},{status : 500});
        return NextResponse.json({"message" : "Order placed Sucessfully" , orderId : order.id },{status : 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({"error" : "Unable to place Your Order Internal server error"},{status : 500});
    }
}