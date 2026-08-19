"use client"
import PaymentListTable from "./UI/PaymentListTable";
import getPayments from "./Controller/getpayments";

export default function Payments() {
    const {
        data, collected, isloading, search, setSearch, status, setStatus, floor, setFloor
    } = getPayments();

    return (
        <section className="w-full h-full md:p-10 p-5 overflow-y-auto">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize">
                <span className="text-gray-500 cursor-pointer">Dashboard</span> / Payments
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-gray-300 shadow-md p-5">
                    <p className="text-sm text-gray-500">Total Collected</p>
                    <p className="text-2xl font-bold text-greenleast">Rs. {collected}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-300 shadow-md p-5">
                    <p className="text-sm text-gray-500">Records</p>
                    <p className="text-2xl font-bold text-greenleast">{data?.length ?? 0}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-300 shadow-md p-5">
                    <p className="text-sm text-gray-500">Successful</p>
                    <p className="text-2xl font-bold text-greenleast">
                        {data?.filter((item) => item.status === 'Success').length ?? 0}
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, phone, PC ID or transaction id"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-greenleast duration-200 bg-white"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-greenleast duration-200 bg-white"
                >
                    <option value="All">All Status</option>
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                </select>
                <select
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-greenleast duration-200 bg-white"
                >
                    <option value="All">All Floors</option>
                    <option value="GroundFloor">Ground Floor</option>
                    <option value="ThirdFloor">3rd Floor</option>
                </select>
            </div>

            <PaymentListTable data={data} isloading={isloading} />
        </section>
    )
}
