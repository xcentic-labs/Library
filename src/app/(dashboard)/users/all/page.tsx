"use client"
import UserListTable from "../UI/UserListTable";
import getAllUser from "./Controller/getalluser";

export default function AllUser() {
    const { data , isloading , redirect } = getAllUser()
    return (
        <section className="w-full h-full md:p-10 p-5">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer" >Dashboard</span> / All Users</h1>
            <UserListTable data={data} isloading={isloading} redirect={redirect} />
        </section>
    )
}