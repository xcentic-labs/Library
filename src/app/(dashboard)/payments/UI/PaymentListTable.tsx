"use client"

import Loader from "@/components/UI/Loader"
import { QuickPayment } from "@/app/(home)/paynow/Controller/paynow"

interface PaymentListTableProps {
    data: QuickPayment[] | undefined,
    isloading: boolean
}

const floorLabel = (floor: string) => floor === 'GroundFloor' ? 'Ground Floor' : '3rd Floor';

const statusColor = (status: string) => {
    if (status === 'Success') return 'bg-green-500';
    if (status === 'Failed') return 'bg-red-500';
    return 'bg-yellow-500';
}

export default function PaymentListTable({ data, isloading }: PaymentListTableProps) {

    return (
        <div className="rounded-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-greenleast text-white text-base font-semibold">
                    <tr>
                        <th className="py-3 px-6">S.No.</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Phone Number</th>
                        <th className="py-3 px-6">PC ID</th>
                        <th className="py-3 px-6">Floor</th>
                        <th className="py-3 px-6">Amount</th>
                        <th className="py-3 px-6">Transaction Id</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isloading ?
                            (
                                <tr className="w-full h-[70vh]" >
                                    <th className="w-full h-full" colSpan={9}>
                                        <div className="w-full h-full flex justify-center items-center">
                                            <Loader />
                                        </div>
                                    </th>
                                </tr>
                            )
                            :
                            !data || data.length == 0
                                ?
                                <tr className="w-full h-14" >
                                    <th className="w-full h-full" colSpan={9}>
                                        <h1>No Payment Found</h1>
                                    </th>
                                </tr>
                                :
                                (
                                    data.map((payment, index) => (
                                        <tr key={payment.id} className="text-center">
                                            <th className="py-3 px-6">{index + 1}</th>
                                            <th className="py-3 px-6">{payment.name}</th>
                                            <th className="py-3 px-6">{payment.phoneNumber}</th>
                                            <th className="py-3 px-6">{payment.pcId || "N/A"}</th>
                                            <th className="py-3 px-6">{floorLabel(payment.floor)}</th>
                                            <th className="py-3 px-6">Rs. {payment.amount}</th>
                                            <th className="py-3 px-6">{payment.tnx_id}</th>
                                            <td className="py-3 px-6">
                                                <span className={`px-4 py-[5px] rounded-lg text-xs font-semibold text-white ${statusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <th className="py-3 px-6">{new Date(payment.createdAt).toLocaleString()}</th>
                                        </tr>
                                    ))
                                )
                    }
                </tbody>
            </table>
        </div>
    )
}
