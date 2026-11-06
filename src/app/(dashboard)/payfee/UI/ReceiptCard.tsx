"use client"
import Image from "next/image";
import logo from "@/assets/logo.png";
import { FeeReceipt } from "../Controller/payfee";
import { amountInWords, formatAmount, formatDate, printReceipt, receiptNo } from "./receiptFormat";
import { downloadReceipt } from "./downloadReceipt";

interface ReceiptCardProps {
    receipt: FeeReceipt,
    onClose: () => void
}

export default function ReceiptCard({ receipt, onClose }: ReceiptCardProps) {
    const rows = [
        { label: "Receipt No.", value: receiptNo(receipt.id) },
        { label: "Date of Payment", value: formatDate(receipt.paymentDate) },
        { label: "Name", value: receipt.name },
        { label: "User ID", value: receipt.userId || "-" },
        { label: "Phone Number", value: receipt.phoneNumber || "-" },
    ];

    return (
        <div className="bg-white rounded-xl border-2 border-greenleast shadow-md overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-4 border-b-2 border-greenleast">
                <Image src={logo} alt="The Path Catalyst" className="w-16 h-auto" />
                <div>
                    <h2 className="text-xl font-bold text-greenleast">The Path Catalyst</h2>
                    <p className="text-sm text-gray-500">Library</p>
                </div>
            </div>
            <div className="bg-greenleast text-white text-center font-bold tracking-[3px] py-2">FEE RECEIPT</div>

            <div className="divide-y divide-gray-200">
                {rows.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 px-6 py-3 text-sm">
                        <span className="text-gray-500">{row.label}</span>
                        <span className="font-semibold text-gray-800 text-right break-all">{row.value}</span>
                    </div>
                ))}
            </div>

            <div className="text-center px-6 py-5 border-t border-gray-200">
                <p className="text-sm text-gray-500">Amount Received</p>
                <p className="text-3xl font-bold text-greenleast">Rs. {formatAmount(receipt.amount)}</p>
                <p className="text-xs text-gray-500 mt-1">{amountInWords(receipt.amount)}</p>
            </div>

            <div className="flex gap-3 px-6 pb-6">
                <button
                    onClick={() => printReceipt(receipt)}
                    className="flex-1 bg-greenleast hover:bg-greenleastshade text-white font-bold py-2.5 rounded-lg duration-200"
                >
                    <i className="fas fa-print mr-2" />Print
                </button>
                <button
                    onClick={() => downloadReceipt(receipt)}
                    className="flex-1 bg-greenleast hover:bg-greenleastshade text-white font-bold py-2.5 rounded-lg duration-200"
                >
                    <i className="fas fa-download mr-2" />Download
                </button>
                <button
                    onClick={onClose}
                    className="flex-1 border border-greenleast text-greenleast hover:bg-greenleast hover:text-white font-bold py-2.5 rounded-lg duration-200"
                >
                    New Receipt
                </button>
            </div>
        </div>
    )
}
