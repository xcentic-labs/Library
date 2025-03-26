"use client"
import { useIsLoggedIn } from "@/hooks/login"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const admindashboard = ()=>{
    const redirect = useRouter()
    const [data , setData] = useState()

    useEffect(()=>{
        const {role} = useIsLoggedIn();
        if(role != 'Admin'){
            redirect.push('/')
        }
    })

    return {
        data
    }
}