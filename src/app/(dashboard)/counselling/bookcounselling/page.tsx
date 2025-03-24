"use client"
import Script from "next/script";
import counsellingBooking from "./Controller/counsellingBooking";

const BookCounselling = () => {
    const { data, handleBookSession } = counsellingBooking();
    return (
        <section className="w-full h-full md:p-10 p-5 rounded-lg shadow-md bg-gray-50 overflow-y-scroll scrollbar">
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer">Dashboard</span> / Counselling</h1>
            {
                data?.map((counselling, index) => (
                    <div key={index} className="w-full h-fit bg-white p-6 rounded-lg shadow-lg mb-8">
                        <h1 className="font-bold text-lg text-gray-700 mb-4">{counselling.name}</h1>
                        <h2 className="font-semibold text-gray-600 text-md mb-2">Benefits:</h2>
                        <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                            {
                                counselling.benefits.split(',').map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))
                            }
                        </ul>
                        <h1 className="font-bold text-gray-700 text-lg mb-6">Price: ₹{counselling.price}</h1>
                        <div className="flex justify-end">
                            <button className="px-6 py-2 bg-greenleast text-white rounded-lg shadow-md font-semibold hover:bg-greenleastshade transition-all"
                                onClick={() => handleBookSession(counselling.price, counselling)}
                            >
                                Book Session
                            </button>
                        </div>
                    </div>
                ))
            }
        </section>
    );
};

export default BookCounselling;
