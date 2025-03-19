"use client"
import libraryLayoutsController from "./Controllers/libraryLayoutsControllers"



export default function StudentLayout(){
    const {
        redirect , layoutName
    } =  libraryLayoutsController()
    console.log(layoutName)
    return(
        <section className="w-full h-full md:p-10 p-5">
            <h1 className="text-xl font-medium mb-6 text-gray-700 capitalize"><span className="text-gray-500 cursor-pointer" onClick={() => redirect.push('/dashboard')}>Dashboard</span> / Layout</h1>
            <div className="mb-5">
                <select name="" id="" className="w-full p-2 border-2 border-greenleast rounded-md  font-bold">
                    <option value="">Select</option>
                    {
                        layoutName.map((layout)=> (
                            <option value={layout?.id}>{layout.layoutName}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                hello
            </div>
        </section>
    )
}