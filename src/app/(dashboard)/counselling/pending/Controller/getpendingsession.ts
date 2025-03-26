"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useIsLoggedIn } from "@/hooks/login";
import { session } from "@/types/types";


export default function getPendingSession() {
    const [data, setData] = useState<Array<session>>();
    const [isloading, setIsLoading] = useState<boolean>(false);
    const redirect = useRouter();
    const { role } = useIsLoggedIn();

    // redirect if not admin
    useEffect(()=>{
        if(role != 'Admin'){
            redirect.push('/')
        }
    },[]);
    
    const fetchAllUserDetails = async () => {
        try {
            const res = await axios.get(`/api/counselling/session?type=pending`);

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

    const handleMakrCompleted = async (id : number | string )=>{
        try {
            const res = await axios.patch(`/api/counselling/session/${id}`);

            if(res.status == 200){
                fetchAllUserDetails();
                toast.success("Marked As Done");
            }else{
                toast.error(res.data.error); 
            }
        } catch (error : any) {
            console.log(error);
            toast.error(error.response.data.error);     
        }
    }


    useEffect(() => {
        fetchAllUserDetails()
    }, [])

    return {
        data,
        isloading,
        redirect,
        handleMakrCompleted
    }
}