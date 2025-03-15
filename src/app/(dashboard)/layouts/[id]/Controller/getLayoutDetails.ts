"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
export function getLayoutDetails() {
    const params = useParams()
    const [data, setData] = useState();
    const [isloading, setIsLoading] = useState(false);

    const fetchLayoutDetails = async () => {
        try {
            const res = await axios.get(`/api/layout/${params.id}`);

            if (res.status == 200) {
                setData(res.data);
            } else {
                setIsLoading(false);
                toast.error(res.data.error)
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.response.data.error)
        }
    }

    useEffect(() => {

    })
}