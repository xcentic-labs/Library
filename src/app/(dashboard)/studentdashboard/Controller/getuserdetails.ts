"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "@/types/types";
import { useIsLoggedIn } from "@/hooks/login";

export default function getUserDetails() {
    const {id , loading} = useIsLoggedIn()
    const [data, setData] = useState<User>();
    const [isloading, setIsLoading] = useState<boolean>(false);


    const getSpecficUser = async () => {
        if(!id) return
        try {
            setIsLoading(true);
            const res = await axios.get(`/api/user/${id}`);
            if (res.status == 200) {
                console.log(res.data.user);
                setData(res.data.user)
            } else {
                toast.error(res.data.error);
            }
        } catch (error: any) {    
                toast.error(error?.response?.data?.error || "Failed to fetch user");
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getSpecficUser()
    },[loading , id])

    const formatDate = (date?: string | Date) => date ? new Date(date).toLocaleDateString() : "N/A";

    const calculateMonthsBetween = (startDate?: string | Date, endDate?: string | Date) => {
        if (!startDate || !endDate) return 0;
    
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const yearDiff = end.getFullYear() - start.getFullYear();
        const monthDiff = end.getMonth() - start.getMonth();
    
        return yearDiff * 12 + monthDiff;
    };
    
    // PATCH user details (used to update mother/father/Aadhar etc.)
    const updateUserDetails = async (payload: Partial<{ education: string; fatherName: string | null; motherName: string | null; AadharNumber: string | null; Gender: string | null; userPhoto?: string | null; aadharPhoto?: string | null }>) => {
        if (!id) {
            toast.error("User id missing");
            return null;
        }
        try {
            setIsLoading(true);
            const res = await axios.patch(`/api/user/${id}`, payload);
            if (res.status === 200) {
                toast.success("Details updated successfully");
                setData(res.data.user);
                return res.data.user;
            } else {
                toast.error(res.data.error || "Failed to update details");
                return null;
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || "Failed to update details");
            return null;
        } finally {
            setIsLoading(false);
        }
    }
    

    return {
        data,
        isloading,
    updateUserDetails,
        formatDate,
        calculateMonthsBetween
    }
}