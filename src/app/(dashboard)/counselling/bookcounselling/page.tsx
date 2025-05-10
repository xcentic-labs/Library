"use client"
import Script from "next/script";
import { useState } from "react";
import counsellingBooking from "./Controller/counsellingBooking";

const BookCounselling = () => {
    const { data, handleBookSession } = counsellingBooking();
    const [activeFaq, setActiveFaq] = useState<number>(0);

    // FAQ toggle handler
    const toggleFaq = (index : number) => {
        if (activeFaq === index) {
            setActiveFaq(0);
        } else {
            setActiveFaq(index);
        }
    };


    // FAQs data
    const faqs = [
        {
            question: "How long does a counselling session last?",
            answer: "Our standard counselling sessions are 50 minutes long. We ensure that you get the full time for discussion, with the last few minutes used to summarize and plan next steps."
        },
        {
            question: "How do I join the online counselling session?",
            answer: "After booking, you'll receive a confirmation email with a secure link to join your session. Simply click on the link at your scheduled time. We recommend joining 5 minutes early to ensure your audio and video are working properly."
        },
        {
            question: "What if I need to reschedule my session?",
            answer: "You can reschedule your session up to 24 hours before the scheduled time without any penalty. Please contact our support team or use the reschedule option in your confirmation email."
        },
        {
            question: "Is my conversation confidential?",
            answer: "Absolutely. All our counselling sessions are completely confidential. Your counsellor follows strict ethical guidelines and privacy policies to ensure your information remains secure."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit/debit cards, UPI, and net banking through our secure payment gateway powered by Razorpay."
        }
    ];

    return (
        <section className="w-full h-full overflow-y-scroll scrollbar bg-gray-50">
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />        
            <h1 className="text-xl font-medium mt-5 ml-5 text-gray-700 capitalize">Dashboard / Counselling</h1>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
                
                {/* Counselling Cards */}
                {!data || data.length === 0 ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md">
                        <div className="text-center p-6">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No counselling sessions available</h3>
                            <p className="mt-1 text-sm text-gray-500">Please check back later for available sessions.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.map((counselling, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="h-3 "></div>
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                            <svg className="w-6 h-6 text-greenleast" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">{counselling.name}</h2>
                                            
                                        </div>
                                    </div>
                                    
                                    <h3 className="font-medium text-gray-700 mb-2">Benefits:</h3>
                                    <ul className="space-y-2 mb-6">
                                        {counselling.benefits.split(',').map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                                </svg>
                                                <span className="text-gray-600">{item.trim()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">₹{counselling.price}</p>
                                            <p className="text-sm text-gray-500">Includes GST</p>
                                        </div>
                                        <button 
                                            className="px-6 py-2   bg-greenleast hover:bg-greenleastshade text-white rounded-lg shadow-sm font-medium transition-all"
                                            onClick={() => handleBookSession(counselling.price, counselling)}
                                        >
                                            Book Session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* FAQ Section */}
                <div className="mt-16" id="faq">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
                    
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 last:border-b-0">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left py-4 px-6 focus:outline-none"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg  text-gray-800 font-bold">{faq.question}</h3>
                                        <svg 
                                            className={`w-5 h-5 text-gray-500 transform transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} 
                                            fill="currentColor" 
                                            viewBox="0 0 20 20"
                                        >
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                </button>
                                
                                <div 
                                    className={`px-6 pb-4 ${activeFaq === index ? 'block' : 'hidden'}`}
                                >
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>        
            </div>   
        </section>
    );
};

export default BookCounselling;