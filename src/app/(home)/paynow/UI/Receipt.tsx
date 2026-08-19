"use client"

import { QuickPayment } from "../Controller/paynow";

interface ReceiptProps {
    receipt: QuickPayment,
    handlePayAgain: () => void
}

const floorLabel = (floor: string) => floor === 'GroundFloor' ? 'Ground Floor' : '3rd Floor';

export default function Receipt({ receipt, handlePayAgain }: ReceiptProps) {

    const rows = [
        { label: "Receipt No.", value: `RCPT-${receipt.id}` },
        { label: "Transaction Id", value: receipt.tnx_id },
        { label: "Name", value: receipt.name },
        { label: "Phone Number", value: receipt.phoneNumber },
        { label: "PC ID", value: receipt.pcId || "N/A" },
        { label: "Floor", value: floorLabel(receipt.floor) },
        { label: "Payment Date", value: new Date(receipt.createdAt).toLocaleString() },
        { label: "UPI Reference", value: receipt.gatewayTxnId || "N/A" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-[#d8d4c2] shadow-featurecard overflow-hidden print:shadow-none print:border-0">
            <div className="bg-greenleast text-white px-6 md:px-8 py-6 text-center">
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold">Payment Successful</h2>
                <p className="text-white/80 text-sm mt-1">The Path Catalyst Library</p>
            </div>

            <div className="px-6 md:px-8 py-6">
                <div className="text-center mb-6">
                    <p className="text-sm text-[#32524D]">Amount Paid</p>
                    <p className="text-4xl font-bold text-greenleast">Rs. {receipt.amount}</p>
                </div>

                <div className="border border-[#d8d4c2] rounded-xl divide-y divide-[#e6e2d3]">
                    {rows.map((row, index) => (
                        <div key={index} className="flex justify-between gap-4 px-4 py-3">
                            <span className="text-sm text-[#32524D]">{row.label}</span>
                            <span className="text-sm font-semibold text-greenleast text-right break-all">{row.value}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="flex-1 bg-greenleast hover:bg-greenleastshade text-white font-bold py-3 rounded-lg duration-200"
                    >
                        Download / Print Receipt
                    </button>
                    <button
                        onClick={handlePayAgain}
                        className="flex-1 border border-greenleast text-greenleast hover:bg-greenleast hover:text-white font-bold py-3 rounded-lg duration-200"
                    >
                        Make Another Payment
                    </button>
                </div>

                <p className="text-xs text-[#32524D] text-center mt-4">
                    Keep this receipt for your records. Please show it at the library desk if asked.
                </p>
            </div>
        </div>
    )
}
