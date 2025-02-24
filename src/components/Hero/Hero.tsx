"use client"
import Image from "next/image"
import student from '@/assets/student.png'
import { useRouter } from "next/navigation"

export default function Hero(){
    const router = useRouter()
    return(
        <section className="w-full md:h-[100vh] h-fit flex flex-col md:flex-row justify-center items-center">
            <div className="lg:w-[50%] md:w-[60%] w-full md:h-full h-[50%] sm:pt-0 pt-20  flex flex-col justify-center items-start p-5 sm:p-10 lg:p-20">
                <h1 className={`md:text-6xl/snug sm:text-5xl/snug text-4xl/snug w-full text-center md:text-left font-semibold mb-6 font-ubuntu`}>Your Gateway to <span className="bg-secondary text-greenleast px-2 pr-6 rounded-xl pb-1">Learning</span></h1>
                <p className="font-medium md:w-[80%] sm:text-lg text-sm text-black/50 mb-6 w-full text-center md:text-left font-ubuntu">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis officiis ad quod voluptas consequatur</p>
                <button className="sm:w-fit w-full bg-greenleast  text-white px-4 py-2 rounded-xl font-bold" onClick={()=> router.push('/#seatbooking')}>Book Your Seat</button>
            </div>
            <div className="lg:w-[50%] md:w-[40%] w-full sm:h-full h-[50%] flex justify-center items-end">
                <div className="md:w-[90%] md:h-[90%] w-full h-full flex justify-start items-end">
                    <Image src={student} className="w-full z-30 md:scale-105 scale-1" alt="Student"></Image>
                </div>
            </div>
        </section>
    )
}
