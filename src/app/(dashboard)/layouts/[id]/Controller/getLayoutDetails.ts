"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation";
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
    const [scale, setScale] = useState<number>(100);

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
    }, []);

    const generatearray = (data: layoutdata) => {
        let array: newArray[] = !data ? [] : new Array(data?.layoutCols * data?.layoutRows).fill({
            id: null,
            index: null,
            isSeat: false,
            isBox: false,
            isLocker: true,
            seatNumber: null
        });

        data?.seats.forEach((item) => {
            array[item.index] = {
                id: item.id,
                index: item.index,
                isSeat: true,
                isBox: false,
                isLocker: item.isLocker,
                seatNumber: item.seatNumber,
                isBooked: item.isBooked,
                isBlocked: item.isBlocked
            };
        });

        const boxarray: number[] = !data ? [] : JSON.parse(data?.boxesAt);

        array = array.map((item, index) => ({
            ...item,
            isBox: boxarray.includes(index),
        }));

        return array;
    }

    const formatDate = (date?: string | Date) => date ? new Date(date).toLocaleDateString() : "N/A";

    const handleAllotment = async (seatID: string | number | undefined) => {
        if (!seatID) return toast.error("Some Thing Went Wrong");
        const result = await Swal.fire({
            title: "Allotment Details",
            html: `
<div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
    <!-- Name Field -->
    <div style="display: flex; align-items: center; gap: 1rem; width: 100%;">
        <label for="name" style="width: 150px; font-size: 1rem; font-weight: bold;">Enter Name</label>
        <input
            type="text"
            id="name"
            name="name"
            style="flex: 1; height: 2.5rem; border: 2px solid #1c3f3a; padding: 0.5rem; border-radius: 6px;"
        />
    </div>

    

    <!-- Phone Number Field -->
    <div style="display: flex; align-items: center; gap: 1rem; width: 100%;">
        <label for="phonenumber" style="width: 150px; font-size: 1rem; font-weight: bold;">Enter Phone Number</label>
        <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            style="flex: 1; height: 2.5rem; border: 2px solid #1c3f3a; padding: 0.5rem; border-radius: 6px;"
        />
    </div>

    <!-- Email Field -->
    <div style="display: flex; align-items: center; gap: 1rem; width: 100%;">
        <label for="email" style="width: 150px; font-size: 1rem; font-weight: bold;">Enter Email Id</label>
        <input
            type="email"
            id="email"
            name="email"
            style="flex: 1; height: 2.5rem; border: 2px solid #1c3f3a; padding: 0.5rem; border-radius: 6px;"
        />
    </div>

    <!-- Months Field -->
    <div style="display: flex; align-items: center; gap: 1rem; width: 100%;">
        <label for="months" style="width: 150px; font-size: 1rem; font-weight: bold;">Months</label>
        <select
            id="months"
            name="months"
            style="flex: 1; height: 2.5rem; border: 2px solid #1c3f3a; padding: 0.5rem; border-radius: 6px;"
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
                const name = document.getElementById("name") as HTMLInputElement;
                const phonenumber = document.getElementById("phonenumber") as HTMLInputElement;
                const email = document.getElementById("email") as HTMLInputElement;
                const monthsElement = document.getElementById("months") as HTMLSelectElement;

                if (!name.value || !phonenumber.value || !email.value || !monthsElement.value) {
                    Swal.showValidationMessage("Please fill out all fields.");
                    return;
                }

                return {
                    name: name.value,
                    phonenumber: phonenumber.value,
                    email: email.value,
                    months: monthsElement.value
                };
            },
            showCancelButton: true,
        });

        if (result.isConfirmed) {
            const { name, phonenumber , email , months } = result.value || {};
            if (name && phonenumber && email && months) {
                const data = {
                    name: name,
                    phoneNumber: phonenumber,
                    email: email,
                    password : 'pc123@'
                }
                try {
                    const res = await axios.post(`/api/user`, JSON.stringify(data))

                    if (res.status == 200) {
                        const response = await axios.patch('/api/seat/allotment', {
                            userId : res.data.userId,
                            seatID : 1,
                            timePeriod: months,
                        });

                        if (response.status == 200) {
                            fetchLayoutDetails()
                            toast.success("Seat Alloted Sucessfully");
                        } else {
                            toast.error(response.data.error)
                        }
                    }
                    else{
                        toast.error("Unable to create Account")
                    }
                } catch (error: any) {
                    toast.error(error.response.data.error)
                }
            } else {
                toast.error("User ID or Time Period is missing.");
            }
        } else {
            toast.error("Allotment canceled.")
        }
    };

    const handleUpdateBlockStatus = async (status: boolean, seatID: string | number | undefined) => {
        const data = {
            status: status,
            seatID: seatID
        }
        try {
            const response = await axios.patch('/api/seat/block', JSON.stringify(data));

            if (response.status == 200) {
                fetchLayoutDetails()
                toast.success("Seat Alloted Sucessfully");
            } else {
                toast.error(response.data.error)
            }
        } catch (error: any) {
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
        scale,
        setScale
    }
}