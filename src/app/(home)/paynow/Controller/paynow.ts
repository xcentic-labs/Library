"use client"
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sanitizeName, sanitizePhoneNumber, validateName, validatePhoneNumber } from "@/lib/validation";

export interface QuickPayment {
    id: number,
    name: string,
    phoneNumber: string,
    pcId: string | null,
    amount: number,
    floor: string,
    tnx_id: string,
    txn_date: string,
    status: string,
    gatewayTxnId: string | null,
    paymentMode: string | null,
    createdAt: string
}

export const paynowController = () => {
    const searchParams = useSearchParams();

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pcId, setPcId] = useState('');
    const [amount, setAmount] = useState('');
    const [floor, setFloor] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isloading, setIsLoading] = useState(false);

    // receipt state , filled once we are back from the gateway
    const [verifying, setVerifying] = useState(false);
    const [receipt, setReceipt] = useState<QuickPayment | undefined>();
    const [failed, setFailed] = useState('');

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(sanitizeName(e.target.value));
    }

    const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(sanitizePhoneNumber(e.target.value));
    }

    const handleChangePcId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPcId(e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 20));
    }

    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value.replace(/\D/g, '').slice(0, 6));
    }

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        const nameError = validateName(name);
        if (nameError) newErrors.name = nameError;

        const phoneError = validatePhoneNumber(phoneNumber);
        if (phoneError) newErrors.phoneNumber = phoneError;

        if (!amount || +amount < 1) newErrors.amount = "Enter a valid amount";

        if (!floor) newErrors.floor = "Select your floor";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleProceedToPay = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);
        try {
            const body = {
                name: name.trim(),
                phoneNumber: phoneNumber.trim(),
                pcId: pcId.trim(),
                amount: +amount,
                floor: floor
            };

            const response = await axios.post('/api/quickpayment', body);

            if (response.status === 200) {
                toast.success("Redirecting to payment");
                window.location.href = response.data.orderInfo.paymentUrl;
            } else {
                setIsLoading(false);
                toast.error(response.data.error);
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.response?.data?.error || "An error occurred while creating the order");
        }
    }

    const handlePayAgain = () => {
        window.location.href = '/paynow';
    }

    // back from the gateway , confirm the payment and build the receipt
    useEffect(() => {
        const verifyPayment = async () => {
            const clientTxnId = searchParams.get('client_txn_id')?.split("?")[0];

            if (!clientTxnId) return;

            setVerifying(true);
            try {
                const response = await axios.post('/api/quickpayment/verify', { tnxId: clientTxnId });

                if (response.status === 200) {
                    setReceipt(response.data.data);
                } else {
                    setFailed(response.data.error || "Payment verification failed");
                }
            } catch (error: any) {
                setFailed(error.response?.data?.error || "Payment verification failed");
            } finally {
                setVerifying(false);
            }
        }
        verifyPayment();
    }, [])

    return {
        name,
        phoneNumber,
        pcId,
        amount,
        floor,
        setFloor,
        errors,
        isloading,
        handleChangeName,
        handleChangePhoneNumber,
        handleChangePcId,
        handleChangeAmount,
        handleProceedToPay,
        handlePayAgain,
        verifying,
        receipt,
        failed
    }
}

export default paynowController
