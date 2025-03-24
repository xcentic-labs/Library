"use client"

import getsessionDetails from "./Controller/getsessionDetails"

export default function UpcomminSession() {
    const { data } = getsessionDetails();
    return (
        <section className="w-full h-full md:p-10 p-5 overflow-y-scroll scrollbar">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer">Dashboard</span> / Upcomming Session</h1>
            {
                data?.length === 0 ?
                    <div className="w-full h-[80%] flex justify-center items-center">
                        <h1 className="text-xl font-bold text-center mb-6 text-greenleast capitalize">No Upcomming Session</h1>
                    </div>
                    :
                    data?.map((counselling, index) => (
                        <div key={index} className="w-full h-fit bg-white p-6 rounded-lg shadow-lg mb-8">
                            <h1 className="font-bold text-lg text-gray-700 mb-4">{counselling.counselling.name}</h1>
                            <h2 className="font-semibold text-gray-600 text-md mb-2">Benefits:</h2>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                                {
                                    counselling.counselling.benefits.split(',').map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))
                                }
                            </ul>
                            <h1 className="font-semibold text-gray-600 text-md mb-2">
                                Status : <span className={`${counselling.status ? "text-green-600" : "text-yellow-600"}`}>
                                    {
                                        counselling.status ? "Completed" : "Upcomming"
                                    }
                                </span>
                            </h1>
                            <h1 className="font-semibold text-gray-600 text-md mb-2">
                                Booked ON: <span className="font-medium">{new Date(counselling.createrAt).toLocaleDateString()}</span>
                            </h1>
                        </div>
                    ))
            }
        </section>
    )
}