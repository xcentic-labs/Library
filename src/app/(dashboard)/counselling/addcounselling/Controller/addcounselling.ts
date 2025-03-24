"use client"
import { counselling } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useIsLoogedIn } from "@/hooks/login";
export default function Addcounselling() {
    const [data, setData] = useState<Array<counselling>>();
    const { role } = useIsLoogedIn();

    // redirect if not admin
    useEffect(() => {
        if (role != 'Admin') {
            redirect.push('/')
        }
    }, []);
    const handleAddcounselling = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!e.target.name.value || !e.target.price.value || !e.target.benefits.value) return toast.error("All fields Are required");

        const data = {
            name: e.target.name.value,
            price: e.target.price.value,
            benefits: e.target.benefits.value
        }
        try {
            const res = await axios.post('/api/counselling', JSON.stringify(data));

            if (res.status == 200) {
                e.target.reset();
                fetchcounselling();
                toast.success("counselling Added Sucessfully");
            } else {
                toast.error(res.data.error)
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }

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

    const handleDeletecounselling = async (id: string | number) => {
        try {
            const res = await axios.delete(`/api/counselling/${id}`);

            if (res.status == 200) {
                fetchcounselling();
                toast.success("counselling Deleted Sucessfully")
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

    return {
        handleAddcounselling,
        data,
        handleDeletecounselling
    }
}