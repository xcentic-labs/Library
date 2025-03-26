import { counselling } from '@/types/types'
import React from 'react'
import { MdDelete } from 'react-icons/md'

interface counsellingListProps {
    data: counselling[] | undefined,
    handleDeletecounselling : (id : string | number) => void
}

const CounsellingList = ({ data , handleDeletecounselling }: counsellingListProps) => {
    return (
        <div className="rounded-xl overflow-x-scroll scrollbar border border-gray-300 shadow-md bg-white">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-greenleast text-white text-base font-semibold">
                    <tr>
                        <th className="py-3 px-6">S.No.</th>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Price</th>
                        <th className="py-3 px-6">Benefits</th>
                        <th className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        !data || data.length == 0
                            ?
                            <tr className="w-full h-14" >
                                <th className="w-full h-full" colSpan={6}>
                                    <h1>No Counselling Found</h1>
                                </th>
                            </tr>
                            :
                            (
                                data.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`text-center font-medium text-md border-b-2 border-b-slate-200 transition duration-200 ${index % 2 ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-100"
                                            }`}
                                    >
                                        <td className="py-3 px-6 font-semibold">{index + 1}</td>

                                        <td className="py-3 px-6 capitalize">{item.name}</td>
                                        <td className="py-3 px-6 capitalize">{item.price}</td>
                                        <td className="py-3 px-6 capitalize text-left">
                                            <ul className="list-disc pl-5">
                                                {
                                                    item.benefits.split(',').map((benefits, i) => (
                                                        <li key={i}>
                                                            {benefits}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </td>
                                        <td className="py-3 px-6 flex items-center justify-center gap-3">
                                            <button
                                                className="bg-red-600 hover:bg-red-500 cursor-pointer p-2 rounded-md transition duration-200 shadow-md flex items-center justify-center"
                                                title="Delete"
                                                onClick={()=> !item.id ? "" : handleDeletecounselling(item.id)  }
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
    )
}

export default CounsellingList


