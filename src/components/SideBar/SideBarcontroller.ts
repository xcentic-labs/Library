"use client";
import { auth } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const SideBarController = () => {
  const redirect = useRouter();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const storeData: any = localStorage.getItem("auth");
      const parsedStoreData: any = JSON.parse(storeData);
      const authPermission = parsedStoreData?.authPermission;

      const sortedData = !authPermission
        ? []
        : authPermission.sort((a: any, b: any) => a.priority - b.priority);

      setData(sortedData);
    }
  }, []); // Runs only once when the component mounts

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/logout");

      if (res.status === 200) {
        toast.success(res.data.message);
        redirect.push("/");
      } else {
        toast.error(res.data.error);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  return {
    data,
    handleLogout,
  };
};

export default SideBarController;
