"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "@/types/types";
import { useParams, useRouter} from "next/navigation";
import { useIsLoggedIn } from "@/hooks/login";

export default function getAllUser() {
    const params = useParams()
    const [data, setData] = useState<User>();
    const [isloading, setIsLoading] = useState<boolean>(false);
    const {role} = useIsLoggedIn();
    const redirect = useRouter();
    // redirect if not admin
    useEffect(()=>{
        if(role != 'Admin'){
            redirect.push('/')
        }
    },[]);

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

    return {
        data,
        isloading,
        formatDate
    }
}