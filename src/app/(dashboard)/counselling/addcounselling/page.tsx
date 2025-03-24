"use client"
import addcounselling from "./Controller/addcounselling";
import CounsellingList from "./UI/counsellingList";
import Form from "./UI/Form";

export default function Addcounselling() {
    const { handleAddcounselling , data , handleDeletecounselling } = addcounselling()
    return (
        <section className="w-full h-full md:p-10 p-5 rounded-lg shadow-md overflow-y-scroll scrollbar">
            <h1 className="text-xl mb-6 text-gray-700 capitalize font-bold">
                Dashboard / counselling
            </h1>
            {/* form to add  counselling*/}
            <Form handleAddcounselling={handleAddcounselling} />

            {/* List of counselling*/}
            <CounsellingList data={data} handleDeletecounselling={handleDeletecounselling} />
        </section>
    );
}
