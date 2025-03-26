"use client";

import { useEffect, useState } from "react";
import { authInfo } from "@/types/types";

export const useIsLoggedIn = () => {
    const [authStatus, setAuthStatus] = useState({
        status: false,
        name: null,
        phoneNumber: null,
        role: null,
        id: null,
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const storedData = localStorage.getItem("auth");
        const defaultAuth = {
            authStatus: false,
            authInfo: {
                id: null,
                name: null,
                phoneNumber: null,
                role: null,
            },
        };

        let auth: authInfo = storedData ? JSON.parse(storedData) : defaultAuth;

        if (!auth.authInfo.name || !auth.authInfo.phoneNumber || !auth.authInfo.role) {
            localStorage.removeItem("auth");
            setAuthStatus({
                status: false,
                name: null,
                phoneNumber: null,
                role: null,
                id: null,
            });
        } else {
            setAuthStatus({
                status: true,
                name: auth.authInfo.name,
                phoneNumber: auth.authInfo.phoneNumber,
                role: auth.authInfo.role,
                id: auth.authInfo.id,
            });
        }
    }, []);

    return authStatus;
};
