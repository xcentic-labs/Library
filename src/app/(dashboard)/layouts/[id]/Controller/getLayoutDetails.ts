"use client"

import { useEffect, useState } from "react"
import { useParams , useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { layoutdata, newArray } from "@/types/types";
import { stringify } from "querystring";


export function getLayoutDetails() {
    const redirect = useRouter()
    const params = useParams()
    const [data, setData] = useState<layoutdata | undefined>();
    const [isloading, setIsLoading] = useState(false);

    const fetchLayoutDetails = async () => {
        try {
            const res = await axios.get(`/api/layout/${params.id}`);

            if (res.status == 200) {
                console.log(res.data.data)
                setData(res.data.data);
            } else {
                setIsLoading(false);
                toast.error(res.data.error);
            }
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        fetchLayoutDetails()
    },[]);

    const generatearray = (data : layoutdata  ) =>{
        let array : newArray[] = !data ? [] : new Array(data?.layoutCols * data?.layoutRows).fill({
            id : null ,
            index : null,
            isSeat : false,
            isBox : false,
            isLocker : true,
            seatNumber : null
        });

        data?.seats.forEach((item)=>{
            array[item.index] = {
                id : item.id,
                index : item.index,
                isSeat : true,
                isBox : false,
                isLocker : true,
                seatNumber : item.seatNumber,
                isBooked : item.isBooked
            };
        });

        const boxarray : number[] = !data ? [] :  JSON.parse(data?.boxesAt);

        array = array.map((item, index) => ({
            ...item, 
            isBox: boxarray.includes(index), 
        }));
    
        return array;
    }

    const formatDate = (date?: string | Date) =>
        date ? new Date(date).toLocaleDateString() : "N/A";


    return {
        data,
        redirect,
        params,
        generatearray,
        formatDate
    }
}