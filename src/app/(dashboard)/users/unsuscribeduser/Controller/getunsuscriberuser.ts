"use client"
import {  useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";
import { useIsLoggedIn } from "@/hooks/login";

export default function getUnSubscribedUser(){
    const [data ,setData] = useState<Array<User>>();
    const [isloading , setIsLoading] = useState<boolean>(false);
    const redirect = useRouter()
    
    const fetchsubscribedUserDetails = async () => {
        try {
            const res = await axios.get(`/api/user?type=unsubscribed`);

            if (res.status == 200) {
                console.log(res.data)
                setData(res.data);
            } else {
                setIsLoading(false);
                toast.error(res.data.error);
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.response.data.error);
        }
    }

    useEffect(()=>{
        fetchsubscribedUserDetails()
    },[])

    return {
        data,
        isloading,
        redirect
    }
}