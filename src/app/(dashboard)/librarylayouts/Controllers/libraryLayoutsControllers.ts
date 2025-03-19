"use client"
import axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface layoutName{
    id : number,
    layoutName : string
}

export  const libraryLayoutsController = ()=>{
    const [layoutName, setLayoutNames] = useState<Array<layoutName>>([]);
    const [isloading, setIsLoading] = useState(false);
    const redirect = useRouter();


    const fetchLayoutNames = async () => {
        try {
            const response = await axios.get('/api/layout/layoutname')
            if (response.status == 200) {
                setLayoutNames(response.data);
                console.log(response.data);
            } else {
                toast.error(response.data.error)
            }
        } catch (error: any) {
            toast.error(error.response.data.error)
        }
    }

    useEffect(()=>{
        fetchLayoutNames();
    },[])

    return {
        redirect,
        layoutName
    }
}

export default libraryLayoutsController