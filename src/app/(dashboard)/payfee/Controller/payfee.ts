"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { sanitizeName, sanitizePhoneNumber, validateName, validatePhoneNumber } from "@/lib/validation";

export interface FeeReceipt {
    id: number,
    name: string,
    userId: string | null,
    phoneNumber: string | null,
    amount: number,
    paymentDate: string,
    createdAt: string
}

// today's date in the admin's local timezone, as YYYY-MM-DD for <input type="date">
export const todayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const emptyForm = () => ({
    name: '',
    userId: '',
    phoneNumber: '',
    amount: '',
    paymentDate: todayISO(),
});

export default function usePayFee() {
    const [form, setForm] = useState(emptyForm());
    const [saving, setSaving] = useState(false);
    const [receipt, setReceipt] = useState<FeeReceipt | null>(null);

    const [list, setList] = useState<FeeReceipt[]>([]);
    const [listLoading, setListLoading] = useState(true);
    const [search, setSearch] = useState('');

    const handleChange = (field: keyof ReturnType<typeof emptyForm>, value: string) => {
        if (field === 'name') value = sanitizeName(value);
        if (field === 'phoneNumber') value = sanitizePhoneNumber(value);
        if (field === 'amount') value = value.replace(/\D/g, '').slice(0, 7);
        if (field === 'userId') value = value.slice(0, 50);
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    const fetchReceipts = async () => {
        try {
            setListLoading(true);
            const res = await axios.get(`/api/feereceipt?search=${encodeURIComponent(search.trim())}`);
            setList(res.data.data);
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Unable to load receipts");
        } finally {
            setListLoading(false);
        }
    }

    // debounced so the admin can type freely in the search box
    useEffect(() => {
        const timer = setTimeout(fetchReceipts, 400);
        return () => clearTimeout(timer);
    }, [search])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const nameError = validateName(form.name);
        if (nameError) return toast.error(nameError);

        if (form.phoneNumber) {
            const phoneError = validatePhoneNumber(form.phoneNumber);
            if (phoneError) return toast.error(phoneError);
        }

        if (!form.amount || Number(form.amount) < 1) return toast.error("Enter a valid amount");
        if (!form.paymentDate) return toast.error("Select the payment date");

        try {
            setSaving(true);
            const res = await axios.post('/api/feereceipt', form);
            toast.success("Receipt generated");
            setReceipt(res.data.data);
            setForm(emptyForm());
            fetchReceipts();
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Unable to save receipt");
        } finally {
            setSaving(false);
        }
    }

    return {
        form,
        handleChange,
        handleSubmit,
        saving,
        receipt,
        setReceipt,
        list,
        listLoading,
        search,
        setSearch,
    }
}
