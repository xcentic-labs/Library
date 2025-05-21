"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserInfo {
    status: boolean;
    name: string;
    phoneNumber: string;
    role: string;
    id: number | string;
    email : string
}

// Cache for storing user info
let cachedUserInfo: UserInfo | null = null;

export const useIsLoggedIn = () => {
    const [data, setData] = useState<UserInfo | null>(cachedUserInfo); // Initialize with cache
    const [loading, setLoading] = useState(!cachedUserInfo); // Skip loading if cache exists

    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/login/isloggedin');

            if (res.status === 200 && res.data?.user.status) {
                const userInfo: UserInfo = {
                    status: true,
                    name: res.data.user.name || "",
                    phoneNumber: res.data.user.phoneNumber || "",
                    role: res.data.user.role || "",
                    id: res.data.user.id || "",
                    email : res.data.user.id || "",
                };
                cachedUserInfo = userInfo; // Update the cache
                setData(userInfo);
            } else {
                const defaultInfo: UserInfo = {
                    status: false,
                    name: "",
                    phoneNumber: "",
                    role: "",
                    id: "",
                    email : "",
                };
                cachedUserInfo = defaultInfo; // Update the cache
                setData(defaultInfo);
            }
        } catch (error) {
            console.error(error);
            const defaultInfo: UserInfo = {
                status: false,
                name: "",
                phoneNumber: "",
                role: "",
                id: "",
                email : "",
            };
            cachedUserInfo = defaultInfo; // Update the cache
            setData(defaultInfo);
        } finally {
            setLoading(false); // Ensure loading state is updated
        }
    };

    useEffect(() => {
        // Only fetch if data is not cached or the status is false
        if (!cachedUserInfo || !cachedUserInfo.status) {
            fetchUser();
        }
    }, []);
    

    console.log({
        loading,
        status: data?.status || false,
        name: data?.name || "",
        phoneNumber: data?.phoneNumber || "",
        role: data?.role || "",
        id: data?.id || "",
    })
    return {
        loading,
        status: data?.status || false,
        name: data?.name || "",
        phoneNumber: data?.phoneNumber || "",
        role: data?.role || "",
        id: data?.id || "",
        email : data?.email
    };
};

