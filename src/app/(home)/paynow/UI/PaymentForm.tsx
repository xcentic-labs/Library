"use client"

import React from "react";

interface PaymentFormProps {
    name: string,
    phoneNumber: string,
    pcId: string,
    amount: string,
    floor: string,
    setFloor: (value: string) => void,
    errors: { [key: string]: string },
    isloading: boolean,
    handleChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleChangePhoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleChangePcId: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleProceedToPay: (e: React.FormEvent) => void
}

const floors = [
    { value: 'GroundFloor', label: 'Ground Floor' },
    { value: 'ThirdFloor', label: '3rd Floor' },
];

export default function PaymentForm({
    name, phoneNumber, pcId, amount, floor, setFloor, errors, isloading,
    handleChangeName, handleChangePhoneNumber, handleChangePcId, handleChangeAmount, handleProceedToPay
}: PaymentFormProps) {

    return (
        <form
            onSubmit={handleProceedToPay}
            className="bg-white rounded-2xl border border-[#d8d4c2] shadow-featurecard p-6 md:p-8"
        >
            <div className="mb-5">
                <label className="block text-sm font-semibold text-greenleast mb-2">
                    Full Name <span className="text-orangeleast">*</span>
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={handleChangeName}
                    placeholder="Enter your full name"
                    className="w-full border border-[#d8d4c2] rounded-lg px-4 py-3 outline-none focus:border-greenleast duration-200"
                />
                {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="mb-5">
                <label className="block text-sm font-semibold text-greenleast mb-2">
                    Phone Number <span className="text-orangeleast">*</span>
                </label>
                <input
                    type="tel"
                    inputMode="numeric"
                    value={phoneNumber}
                    onChange={handleChangePhoneNumber}
                    placeholder="10 digit mobile number"
                    className="w-full border border-[#d8d4c2] rounded-lg px-4 py-3 outline-none focus:border-greenleast duration-200"
                />
                {errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>

            <div className="mb-5">
                <label className="block text-sm font-semibold text-greenleast mb-2">
                    PC ID <span className="text-[#32524D] font-normal">(optional)</span>
                </label>
                <input
                    type="text"
                    value={pcId}
                    onChange={handleChangePcId}
                    placeholder="e.g. PC2026101"
                    className="w-full border border-[#d8d4c2] rounded-lg px-4 py-3 outline-none focus:border-greenleast duration-200"
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-semibold text-greenleast mb-2">
                    Amount (Rs.) <span className="text-orangeleast">*</span>
                </label>
                <input
                    type="text"
                    inputMode="numeric"
                    value={amount}
                    onChange={handleChangeAmount}
                    placeholder="Enter amount to pay"
                    className="w-full border border-[#d8d4c2] rounded-lg px-4 py-3 outline-none focus:border-greenleast duration-200"
                />
                {errors.amount && <p className="text-red-600 text-xs mt-1">{errors.amount}</p>}
            </div>

            <div className="mb-8">
                <label className="block text-sm font-semibold text-greenleast mb-2">
                    Select Floor <span className="text-orangeleast">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                    {floors.map((item) => (
                        <button
                            type="button"
                            key={item.value}
                            onClick={() => setFloor(item.value)}
                            className={`border rounded-lg px-4 py-3 font-semibold duration-200 ${floor === item.value
                                ? "bg-greenleast text-white border-greenleast"
                                : "bg-white text-greenleast border-[#d8d4c2] hover:border-greenleast"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
                {errors.floor && <p className="text-red-600 text-xs mt-1">{errors.floor}</p>}
            </div>

            <button
                type="submit"
                disabled={isloading}
                className="w-full bg-greenleast hover:bg-greenleastshade disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg duration-200"
            >
                {isloading ? "Please wait..." : `Proceed to Pay${amount ? ` Rs. ${amount}` : ''}`}
            </button>

            <p className="text-xs text-[#32524D] text-center mt-4">
                You will be redirected to a secure UPI payment page. No login required.
            </p>
        </form>
    )
}
