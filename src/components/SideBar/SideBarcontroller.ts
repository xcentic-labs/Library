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
      const authRole = parsedStoreData?.authInfo?.role;

      console.log("User Role:", authRole); // Debugging line

      const d1 = [{ "id": 1, "title": "Dashboard", "permitTo": "Admin", "priority": "1", "item": [{ "id": 1, "name": "Dashboard", "icon": "fas fa-home", "route": "/admindashboard", "parentId": 1 }] }, { "id": 2, "title": "Users", "permitTo": "Admin", "priority": "3", "item": [{ "id": 4, "name": "Total User", "icon": "fas fa-users", "route": "/users/all", "parentId": 2 }, { "id": 5, "name": "Subscribed User", "icon": "fas fa-user-check", "route": "/users/suscribeduser", "parentId": 2 }, { "id": 14, "name": "Unsubscribed User", "icon": "fas fa-user-times", "route": "/users/unsuscribeduser", "parentId": 2 }] }, { "id": 3, "title": "Layout", "permitTo": "Admin", "priority": "2", "item": [{ "id": 2, "name": "Create Layout", "icon": "fas fa-pencil-alt", "route": "/addlayout", "parentId": 3 }, { "id": 3, "name": "Layouts", "icon": "fas fa-th-large", "route": "/layouts", "parentId": 3 }] }, { "id": 6, "title": "Counseling", "permitTo": "Admin", "priority": "4", "item": [{ "id": 8, "name": "Add Counseling", "icon": "fa fa-plus-circle", "route": "/counselling/addcounselling", "parentId": 6 }, { "id": 9, "name": "Counseling Request", "icon": "fas fa-user-graduate", "route": "/counselling/all", "parentId": 6 }, { "id": 12, "name": "Pending Counselling", "icon": "fas fa-calendar-alt", "route": "/counselling/pending", "parentId": 6 }] }, { "id": 8, "title": "Announcement", "permitTo": "ADMIN", "priority": "5", "item": [{ "id": 13, "name": "Announcement", "icon": "fa fa-bullhorn", "route": "/announcement/addannouncement", "parentId": 8 }] }]
      const d2 = [{ "id": 4, "title": "Layout", "permitTo": "User", "priority": "2", "item": [{ "id": 7, "name": "Layouts", "icon": "fas fa-th-large", "route": "/librarylayouts", "parentId": 4 }] }, { "id": 5, "title": "Dashboard", "permitTo": "User", "priority": "1", "item": [{ "id": 6, "name": "Dashboard", "icon": "fas fa-home", "route": "/studentdashboard", "parentId": 5 }] }, { "id": 7, "title": "Counseling", "permitTo": "User", "priority": "3", "item": [{ "id": 10, "name": "Counselling", "icon": "fas fa-user-graduate", "route": "/counselling/bookcounselling", "parentId": 7 }, { "id": 11, "name": "Upcomming", "icon": "fas fa-calendar-alt", "route": "/counselling/upcommingcounselling", "parentId": 7 }] }]


      if (authRole === "Admin") {
        setData(d1);
      } else if (authRole === "User") {
        setData(d2);
      } else {
        setData([]); // Default to empty array if role is unrecognized
      }
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
