"use client"
import { useIsLoggedIn } from "@/hooks/login"
import { session } from "@/types/types";
import axios from "axios"
import { useEffect, useState } from "react";
import {toast} from 'react-toastify'

const getsessionDetails = () => {
    const { id } = useIsLoggedIn();
    const [data , setData] = useState<Array<session>>()

    useEffect(()=>{
        !id ? "" : fetchSessionDetails((+id))
    },[])
    const fetchSessionDetails = async (id: number) => {
        try {
            const res = await axios.get(`/api/counselling/session/${id}`);
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

    return {
        data
    }
}

export default getsessionDetails