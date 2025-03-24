"use client"
import Loader from "@/components/UI/Loader"
import { getLayouts } from "./Controllers/getlayouts"
import { FaEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
export default function Layouts() {
    const { data, isloading, handleDeleteLayout, redirect } = getLayouts()

    return (
        <section className="w-full h-full md:p-10 p-5">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer" onClick={() => redirect.push('/dashboard')}>Dashboard</span> / Layout</h1>
            <div className="rounded-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-greenleast text-white text-base font-semibold">
                        <tr>
                            <th className="py-3 px-6">S.No.</th>
                            <th className="py-3 px-6">Layout Name</th>
                            <th className="py-3 px-6">Layout Id</th>
                            <th className="py-3 px-6">Monthly fee</th>
                            {/* <th className="py-3 px-6">Weekly Fee</th> */}
                            <th className="py-3 px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isloading ?
                                (
                                    <>
                                        <tr className="w-full h-[70vh]" >
                                            <th className="w-full h-full" colSpan={6}>
                                                <div className="w-full h-full flex justify-center items-center">
                                                    <Loader />
                                                </div>
                                            </th>
                                        </tr>
                                    </>
                                )
                                :
                                data.length == 0
                                    ?
                                    <tr className="w-full h-14" >
                                        <th className="w-full h-full" colSpan={6}>
                                            <h1>No Layout Found</h1>
                                        </th>
                                    </tr>
                                    :
                                    (
                                        data.map((item, index) => (
                                            <tr key={index} className={`text-center font-medium text-md border-b-slate-200 border-b-2 ${index % 2 ? 'bg-gray-100' : ""}`}>
                                                <td className="py-3 px-6">{index + 1}</td>
                                                <td className="py-3 px-6 capitalize">{(item.layoutName)}</td>
                                                <td className="py-3 px-6">{item.id}</td>
                                                <td className="py-3 px-6">{'N/A'}</td>

                                                <td className="py-3 px-6 flex items-center justify-center gap-2">
                                                    <button
                                                        className="bg-greenleast hover:bg-greenleastshade cursor-pointer p-2 rounded-md transition duration-200 shadow-md"
                                                        onClick={() => redirect.push(`/layouts/${item.id}`)}
                                                    >
                                                        <FaEye className="text-white text-md" />
                                                    </button>
                                                    <button
                                                        className="bg-red-600 hover:bg-red-500 cursor-pointer p-2 rounded-md transition duration-200 shadow-md"
                                                        onClick={() => handleDeleteLayout(item.id)}
                                                    >
                                                        <MdDelete className="text-white text-md" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

