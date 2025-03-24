import React from "react"


interface FormProps {
    handleAddcounselling : (e : React.FormEvent<HTMLFormElement>) => void
}
const Form = ({handleAddcounselling} : FormProps) => {
    return (
        <div className="w-full h-fit bg-white p-4 rounded-lg mb-10">
            <h2 className="text-xl mb-4 font-semibold text-[#32524D] capitalize">
                Add counselling
            </h2>
            <form className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" onSubmit={(e) => handleAddcounselling(e)}>
                <div className="flex flex-col">
                    <label
                        htmlFor="name"
                        className="mb-2 text-sm font-medium text-gray-600"
                    >
                        Enter Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                        placeholder="e.g., John Doe"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="price"
                        className="mb-2 text-sm font-medium text-gray-600"
                    >
                        Enter Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                        placeholder="e.g., $100"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="benefits"
                        className="mb-2 text-sm font-medium text-gray-600"
                    >
                        Benefits (Separated By Comma)
                    </label>
                    <input
                        type="text"
                        id="benefits"
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#32524D]"
                        placeholder="e.g., Benefit1, Benefit2"
                    />
                </div>
                <div className="col-span-full flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 mt-4 text-white bg-[#32524D] rounded-lg shadow-md hover:bg-[#2a423e] focus:outline-none focus:ring-2 focus:ring-[#32524D] focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form