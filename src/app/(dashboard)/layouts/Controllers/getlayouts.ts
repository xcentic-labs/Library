"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { layoutDetails } from "@/types/types"
import { useRouter } from "next/navigation";
import { useIsLoggedIn } from "@/hooks/login"

export function getLayouts() {
    const [data, setData] = useState<Array<layoutDetails>>([]);
    const [isloading, setIsLoading] = useState(false);
    const redirect = useRouter();
    const {role} = useIsLoggedIn()

    useEffect(()=>{
        if(role != 'Admin'){
            redirect.push('/')
        }
    },[])
    
    const fetchLayout = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/layout')
            if (response.status == 200) {
                setData(response.data);
                setIsLoading(false);
                console.log(response.data);
            } else {
                setIsLoading(false);
                toast.error(response.data.error)
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {
        fetchLayout();
    }, []);

    const handleDeleteLayout = async (id: number | undefined) => {
        if(!id) return toast.error("LayoutId Not Defined")
        try {
            const res = await axios.delete(`/api/layout/${id}`);
            if (res.status == 200) {
                toast.success(res.data.message);
                fetchLayout();
            } else {
                toast.error(res.data.error)
            }
        }
        catch (error: any) {
            toast.error(error.response.data.error)
        }
    }

    return {
        data,
        isloading,
        handleDeleteLayout,
        redirect
    }
}