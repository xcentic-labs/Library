"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "@/types/types";
import { useIsLoggedIn } from "@/hooks/login";

export default function getUserDetails() {
    const {id} = useIsLoggedIn()
    const [data, setData] = useState<User>();
    const [isloading, setIsLoading] = useState<boolean>(false);

    console.log()

    const getSpecficUser = async () => {
        try {
            const res = await axios.get(`/api/user/${id}`);
            if (res.status == 200) {
                console.log(res.data.user);
                setData(res.data.user)
            } else {
                toast.error(res.data.error);
            }
        } catch (error: any) {    
                toast.error(error.response.data.error);
        }
    }

    useEffect(()=>{
        getSpecficUser()
    },[])

    const formatDate = (date?: string | Date) => date ? new Date(date).toLocaleDateString() : "N/A";

    const calculateMonthsBetween = (startDate?: string | Date, endDate?: string | Date) => {
        if (!startDate || !endDate) return 0;
    
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const yearDiff = end.getFullYear() - start.getFullYear();
        const monthDiff = end.getMonth() - start.getMonth();
    
        return yearDiff * 12 + monthDiff;
    };
    

    return {
        data,
        isloading,
        formatDate,
        calculateMonthsBetween
    }
}