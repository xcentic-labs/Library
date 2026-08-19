"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { QuickPayment } from "@/app/(home)/paynow/Controller/paynow";

export default function getPayments() {
    const [data, setData] = useState<Array<QuickPayment>>();
    const [collected, setCollected] = useState<number>(0);
    const [isloading, setIsLoading] = useState<boolean>(true);

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const [floor, setFloor] = useState('All');

    const fetchPayments = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/api/quickpayment?status=${status}&floor=${floor}&search=${encodeURIComponent(search.trim())}`);

            if (res.status == 200) {
                setData(res.data.data);
                setCollected(res.data.collected);
            } else {
                toast.error(res.data.error);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Unable to load payments");
        } finally {
            setIsLoading(false);
        }
    }

    // debounced so the admin can type freely in the search box
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPayments();
        }, 400);

        return () => clearTimeout(timer);
    }, [search, status, floor])

    return {
        data,
        collected,
        isloading,
        search,
        setSearch,
        status,
        setStatus,
        floor,
        setFloor,
        fetchPayments
    }
}
