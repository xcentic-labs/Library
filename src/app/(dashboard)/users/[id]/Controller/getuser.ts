"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "@/types/types";
import { useParams, useRouter} from "next/navigation";

export default function getAllUser() {
    const params = useParams()
    const [data, setData] = useState<User>();
    const [isloading, setIsLoading] = useState<boolean>(false);

    const getSpecficUser = async () => {
        try {
            const res = await axios.get(`/api/user/${params.id}`);
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

    const refreshUser = () => {
        getSpecficUser();
    };

    return {
        data,
        isloading,
        formatDate,
        refreshUser
    }
}