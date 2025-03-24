"use client"
import UserListTable from "../UI/UserListTable";
import getSuscribedUser from "./Controller/getsuscriberuser";

export default function SubscribedUser() {
    const { data , isloading ,redirect } = getSuscribedUser()
    return (
        <section className="w-full h-full md:p-10 p-5">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer" >Dashboard</span> / All Users</h1>
            <UserListTable data={data} isloading={isloading} redirect={redirect} />
        </section>
    )
}