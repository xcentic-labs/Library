"use client"
import Image from "next/image"
import student from '@/assets/student2.jpg'
import { FaBook, FaUsers, FaLaptop, FaChalkboardTeacher } from "react-icons/fa";
import { useIsLoggedIn } from "@/hooks/login";
import Link from "next/link";


export default function SeatBooking() {
    const {status } = useIsLoggedIn()
    return (
        <section className="w-full ">
            <div className="w-full h-fit bg-white md:rounded-bl-[20%] p-5 md:py-10">
                <div className="max-w-7xl mx-auto p-4 ">
                    <h1 className=" text-3xl md:text-5xl font-ubuntu text-center font-bold capitalize" id="seatbooking">Book Your Seat Now <br /> <span className="text-greenleast text-2xl md:text-4xl relative">just at @499 <span className="w-full h-[5px] bg-greenleast absolute -bottom-2 right-0"></span></span></h1>
                </div>
                <div className="w-full h-fit  flex lg:flex-row flex-col-reverse justify-center items-start">
                    <div className="lg:w-[50%] h-[50%] lg:h-full  flex flex-col justify-start items-start p-1 md:p-20">
                        <h1 className="text-2xl md:text-3xl/snug font-semibold font-ubuntu mb-6">
                            Be The part of <span className="text-greenleast">Path Catalyst</span>
                        </h1>
                        <p className="text-justify mb-6 text-black/50 font-ubuntu"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit a porro fugit enim iste omnis. Laborum, minima! Praesentium asperiores dignissimos odit quo neque, optio porro, deleniti odio ullam ut, blanditiis dolorem. Eveniet esse deleniti totam nihil provident commodi. Quia, earum.</p>
                        <div className="grid grid-cols-2 gap-5 mb-6">
                            <div className="bg-white rounded-lg  shadow-featurecard p-4 flex sm:flex-row flex-col items-start sm:items-center sm:gap-0 gap-2">
                                <FaBook className="text-greenleast text-2xl sm:text-4xl mr-4" />
                                <div >
                                    <h3 className="text-lg font-semibold">Knowledge Access</h3>
                                    <p className="text-sm text-gray-600 w-full">Vast collection of books and resources.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg  shadow-featurecard p-4 flex sm:flex-row flex-col items-start sm:items-center sm:gap-0 gap-2">
                                <FaLaptop className="text-greenleast text-2xl sm:text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Digital Access</h3>
                                    <p className="text-sm text-gray-600">E-books, research papers, and Wi-Fi.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg  shadow-featurecard p-4 flex sm:flex-row flex-col items-start sm:items-center sm:gap-0 gap-2">
                                <FaUsers className="text-greenleast text-2xl sm:text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Community Hub</h3>
                                    <p className="text-sm text-gray-600">Events and networking opportunities.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg  shadow-featurecard p-4 flex sm:flex-row flex-col items-start sm:items-center sm:gap-0 gap-2">
                                <FaChalkboardTeacher className="text-greenleast text-2xl sm:text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Skill Development</h3>
                                    <p className="text-sm text-gray-600">Workshops and educational programs.</p>
                                </div>
                            </div>
                        </div>
                        <Link href={status ? '/librarylayouts' : '/login'}>
                        <button className=" bg-greenleast text-white px-7 py-2 rounded-xl font-bold cursor-pointer">Book Your Seat</button>
                        </Link>
                    </div>
                    <div className="lg:w-[50%] h-[50%] lg:h-full  flex justify-center items-center ">
                        <div className="lg:w-[90%] w-full h-full lg:h-[90%] flex justify-start items-center">
                            <Image src={student} className="rounded-3xl" alt="student"></Image>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}