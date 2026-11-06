"use client"
import Loader from "@/components/UI/Loader";
import usePayFee, { todayISO } from "./Controller/payfee";
import ReceiptCard from "./UI/ReceiptCard";
import { downloadReceipt } from "./UI/downloadReceipt";
import { formatAmount, formatDate, printReceipt, receiptNo } from "./UI/receiptFormat";

const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-greenleast duration-200 bg-white";

export default function PayFee() {
    const {
        form, handleChange, handleSubmit, saving, receipt, setReceipt, list, listLoading, search, setSearch
    } = usePayFee();

    return (
        <section className="w-full h-full md:p-10 p-5 overflow-y-auto">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize">
                <span className="text-gray-500 cursor-pointer">Dashboard</span> / Pay Fee
            </h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-300 shadow-md p-6 flex flex-col gap-4 h-fit">
                    <h2 className="text-lg font-bold text-greenleast">Generate Fee Receipt</h2>

                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>Name <span className="text-red-500">*</span></span>
                        <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Student name" className={inputClass} required />
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1 text-sm text-gray-600">
                            <span>User ID <span className="text-gray-400">(optional)</span></span>
                            <input type="text" value={form.userId} onChange={(e) => handleChange('userId', e.target.value)}
                                placeholder="e.g. PC-101" className={inputClass} />
                        </label>
                        <label className="flex flex-col gap-1 text-sm text-gray-600">
                            <span>Phone Number <span className="text-gray-400">(optional)</span></span>
                            <input type="tel" inputMode="numeric" value={form.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                placeholder="10 digit number" className={inputClass} />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-1 text-sm text-gray-600">
                            <span>Amount (Rs.) <span className="text-red-500">*</span></span>
                            <input type="text" inputMode="numeric" value={form.amount} onChange={(e) => handleChange('amount', e.target.value)}
                                placeholder="Amount" className={inputClass} required />
                        </label>
                        <label className="flex flex-col gap-1 text-sm text-gray-600">
                            <span>Date of Payment <span className="text-red-500">*</span></span>
                            <input type="date" value={form.paymentDate} max={todayISO()} onChange={(e) => handleChange('paymentDate', e.target.value)}
                                className={inputClass} required />
                        </label>
                    </div>

                    <label className="flex flex-col gap-1 text-sm text-gray-600">
                        <span>Comment <span className="text-gray-400">(optional)</span></span>
                        <textarea value={form.comment} onChange={(e) => handleChange('comment', e.target.value)}
                            placeholder="e.g. Fee for November" rows={2} className={`${inputClass} resize-none`} />
                    </label>

                    <button type="submit" disabled={saving}
                        className="bg-greenleast hover:bg-greenleastshade text-white font-bold py-2.5 rounded-lg duration-200 disabled:opacity-60">
                        {saving ? "Saving..." : "Save & Generate Receipt"}
                    </button>
                </form>

                <div>
                    {receipt ? (
                        <ReceiptCard receipt={receipt} onClose={() => setReceipt(null)} />
                    ) : (
                        <div className="h-full min-h-[200px] rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm p-6 text-center">
                            The receipt will appear here after you save.
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold text-gray-700">Fee Receipts</h2>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, user id or phone" className={`${inputClass} md:w-80`} />
            </div>

            <div className="rounded-xl overflow-x-auto scrollbar border border-gray-300 shadow-md bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-greenleast text-white text-base font-semibold">
                        <tr>
                            <th className="py-3 px-6">Receipt No.</th>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">User ID</th>
                            <th className="py-3 px-6">Phone Number</th>
                            <th className="py-3 px-6">Amount</th>
                            <th className="py-3 px-6">Date of Payment</th>
                            <th className="py-3 px-6">Comment</th>
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listLoading ? (
                            <tr className="h-40">
                                <td colSpan={8}><div className="flex justify-center items-center"><Loader /></div></td>
                            </tr>
                        ) : list.length === 0 ? (
                            <tr className="h-14">
                                <td colSpan={8} className="text-center">No Receipt Found</td>
                            </tr>
                        ) : (
                            list.map((item) => (
                                <tr key={item.id} className="text-center border-t border-gray-200">
                                    <td className="py-3 px-6">{receiptNo(item.id)}</td>
                                    <td className="py-3 px-6">{item.name}</td>
                                    <td className="py-3 px-6">{item.userId || "-"}</td>
                                    <td className="py-3 px-6">{item.phoneNumber || "-"}</td>
                                    <td className="py-3 px-6">Rs. {formatAmount(item.amount)}</td>
                                    <td className="py-3 px-6">{formatDate(item.paymentDate)}</td>
                                    <td className="py-3 px-6 max-w-[220px] truncate" title={item.comment || undefined}>{item.comment || "-"}</td>
                                    <td className="py-3 px-6">
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => printReceipt(item)}
                                                className="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-greenleast hover:bg-greenleastshade duration-200">
                                                <i className="fas fa-print mr-1" />Print
                                            </button>
                                            <button onClick={() => downloadReceipt(item)}
                                                className="px-3 py-1 rounded-lg text-xs font-semibold text-greenleast border border-greenleast hover:bg-greenleast hover:text-white duration-200 whitespace-nowrap">
                                                <i className="fas fa-download mr-1" />Download
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
