"use client"
import { useIsLoogedIn } from "@/hooks/login"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const admindashboard = ()=>{
    const redirect = useRouter()
    const {role} = useIsLoogedIn();
    const [data , setData] = useState()

    useEffect(()=>{
        if(role != 'Admin'){
            redirect.push('/')
        }
    })

    return 
}