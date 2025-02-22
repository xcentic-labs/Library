"use client"
import Image from "next/image"
import student from '@/assets/student.png'
import { useRouter } from "next/navigation"

export default function Hero(){
    const router = useRouter()
    return(
        <section className="w-full h-[100vh] flex justify-center items-center">
            <div className="w-[50%] h-full  flex flex-col justify-center items-start p-20">
                <h1 className={`text-6xl/snug font-semibold mb-6 font-ubuntu`}>Your Gateway to <span className="bg-secondary text-greenleast px-2 pr-6 rounded-xl pb-1">Learning</span></h1>
                <p className="font-medium w-[80%] text-lg text-black/50 mb-6 font-ubuntu">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis officiis ad quod voluptas consequatur</p>
                <button className=" bg-greenleast text-white px-4 py-2 rounded-xl font-bold" onClick={()=> router.push('/#seatbooking')}>Book Your Seat</button>
            </div>
            <div className="w-[50%] h-full  flex justify-center items-end">
                <div className="w-[90%] h-[90%] flex justify-start items-end">
                    <Image src={student} className="w-full z-30 scale-105 " alt="Student"></Image>
                </div>
            </div>
        </section>
    )
}
