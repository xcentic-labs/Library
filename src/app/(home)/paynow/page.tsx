"use client"
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import paynowController from "./Controller/paynow";
import PaymentForm from "./UI/PaymentForm";
import Receipt from "./UI/Receipt";
import Loader from "@/components/UI/Loader";

function PayNow() {
    const {
        name, phoneNumber, pcId, amount, floor, setFloor, errors, isloading,
        handleChangeName, handleChangePhoneNumber, handleChangePcId, handleChangeAmount,
        handleProceedToPay, handlePayAgain, verifying, receipt, failed
    } = paynowController();

    return (
        <section className="w-full min-h-screen pt-[14vh] pb-14 px-4 md:px-10 bg-[#f7f6f1]">
            <ToastContainer />
            <div className="max-w-xl mx-auto">

                {verifying && (
                    <div className="bg-white rounded-2xl border border-[#d8d4c2] shadow-featurecard p-10 flex flex-col items-center gap-4">
                        <Loader />
                        <p className="text-[#32524D] font-semibold">Verifying your payment...</p>
                    </div>
                )}

                {!verifying && receipt && (
                    <Receipt receipt={receipt} handlePayAgain={handlePayAgain} />
                )}

                {!verifying && !receipt && failed && (
                    <div className="bg-white rounded-2xl border border-[#d8d4c2] shadow-featurecard p-8 text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
                        <p className="text-[#32524D] mb-6">{failed}. If money was deducted it will be refunded automatically.</p>
                        <button
                            onClick={handlePayAgain}
                            className="bg-greenleast hover:bg-greenleastshade text-white font-bold px-6 py-3 rounded-lg duration-200"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!verifying && !receipt && !failed && (
                    <>
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-greenleast mb-2">Pay Library Fee</h1>
                            <p className="text-[#32524D]">
                                Fill in your details and pay online. You will get a receipt right after the payment.
                            </p>
                        </div>

                        <PaymentForm
                            name={name}
                            phoneNumber={phoneNumber}
                            pcId={pcId}
                            amount={amount}
                            floor={floor}
                            setFloor={setFloor}
                            errors={errors}
                            isloading={isloading}
                            handleChangeName={handleChangeName}
                            handleChangePhoneNumber={handleChangePhoneNumber}
                            handleChangePcId={handleChangePcId}
                            handleChangeAmount={handleChangeAmount}
                            handleProceedToPay={handleProceedToPay}
                        />
                    </>
                )}
            </div>
        </section>
    )
}

export default function PayNowPage() {
    return (
        <Suspense fallback={
            <section className="w-full min-h-screen pt-[14vh] flex justify-center bg-[#f7f6f1]">
                <Loader />
            </section>
        }>
            <PayNow />
        </Suspense>
    )
}
