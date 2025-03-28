"use client"

import { useEffect, useState } from "react"
import { useParams , useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { layoutdata, newArray } from "@/types/types";
import { useIsLoggedIn } from "@/hooks/login";
import Swal from "sweetalert2";
import { json } from "stream/consumers";


export function getLayoutDetails() {
    const redirect = useRouter()
    const params = useParams()
    const [data, setData] = useState<layoutdata | undefined>();
    const [isloading, setIsLoading] = useState(false);
    const [scale ,setScale] = useState<number>(100);
    
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
                isLocker : item.isLocker,
                seatNumber : item.seatNumber,
                isBooked : item.isBooked,
                isBlocked : item.isBlocked
            };
        });

        const boxarray : number[] = !data ? [] :  JSON.parse(data?.boxesAt);

        array = array.map((item, index) => ({
            ...item, 
            isBox: boxarray.includes(index), 
        }));
    
        return array;
    }

    const formatDate = (date?: string | Date) => date ? new Date(date).toLocaleDateString() : "N/A";

    const handleAllotment = async (seatID : string  | number | undefined) => {
        if(!seatID) return  toast.error("Some Thing Went Wrong");
        const result = await Swal.fire({
            title: "Allotment Details",
            html: `
                <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 1rem; width: 100%;">
                    <div style="width: 100%;>
                        <label for="userid" style="font-size: 1rem; font-weight: bold;">Enter User ID</label>
                        <input 
                            type="text" 
                            id="userid" 
                            name="userid" 
                            style="width: 100%; height: 2.5rem; border: 2px solid #1c3f3a; padding: 0.5rem;" 
                        />
                    </div>
                    <div style="width: 100%;>
                        <label for="months" style="font-size: 1rem; font-weight: bold;">Months</label>
                        <select 
                            id="months" 
                            name="months" 
                            style="width: 100%; height: 2.5rem; border: 2px solid #1c3f3a; padding: 0.5rem;"
                        >
                            <option value="1">1 Month</option>
                            <option value="2">2 Months</option>
                            <option value="3">3 Months</option>
                            <option value="4">4 Months</option>
                            <option value="5">5 Months</option>
                            <option value="6">6 Months</option>
                            <option value="7">7 Months</option>
                            <option value="8">8 Months</option>
                            <option value="9">9 Months</option>
                            <option value="10">10 Months</option>
                            <option value="11">11 Months</option>
                            <option value="12">12 Months</option>
                        </select>
                    </div>
                </div>
            `,
            focusConfirm: false, // Prevents autofocus on the confirm button
            preConfirm: () => {
                const userIdElement = document.getElementById("userid");
                const monthsElement = document.getElementById("months");
    
                if (!userIdElement || !monthsElement) {
                    Swal.showValidationMessage("Please fill out all fields.");
                    return;
                }
    
                const userId = (userIdElement as HTMLInputElement).value;
                const timePeriod = (monthsElement as HTMLSelectElement).value;
    
                return { userId, timePeriod };
            },
            showCancelButton: true,
        });
    
        if (result.isConfirmed) {
            const { userId, timePeriod } = result.value || {};
            if (userId && timePeriod) {
                const data =  {
                    userId : userId,
                    timePeriod : timePeriod,
                    seatID : seatID
                }
                try {
                    const response = await axios.patch('/api/seat/allotment' , JSON.stringify(data));

                    if(response.status == 200){
                        fetchLayoutDetails()
                        toast.success("Seat Alloted Sucessfully");
                    }else{
                        toast.error(response.data.error)
                    }
                } catch (error : any) {
                    toast.error(error.response.data.error)
                }
            } else {
                toast.error("User ID or Time Period is missing.");
            }
        } else {
            toast.error("Allotment canceled.")
        }
    };

    const handleUpdateBlockStatus = async (status : boolean , seatID : string | number | undefined)=>{
        const data = {
            status : status,
            seatID : seatID
        }
        try {
            const response = await axios.patch('/api/seat/block' , JSON.stringify(data));

            if(response.status == 200){
                fetchLayoutDetails()
                toast.success("Seat Alloted Sucessfully");
            }else{
                toast.error(response.data.error)
            }
        } catch (error : any) {
            toast.error(error.response.data.error)
        }
    }
    

    return {
        data,
        redirect,
        params,
        generatearray,
        formatDate,
        handleAllotment,
        handleUpdateBlockStatus,
        scale ,
        setScale
    }
}