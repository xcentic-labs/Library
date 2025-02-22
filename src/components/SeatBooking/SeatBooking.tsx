import Image from "next/image"
import student from '@/assets/student2.jpg'
import { FaBook, FaUsers, FaLaptop, FaChalkboardTeacher } from "react-icons/fa";


export default function SeatBooking() {
    return (
        <section className="w-full  bg-secondary">
            <div className="w-full h-fit bg-white rounded-bl-[20%] py-10">
                <div className="max-w-7xl mx-auto p-4 ">
                    <h1 className="text-5xl font-ubuntu text-center font-bold capitalize" id="seatbooking">Book Your Seat Now <br /> <span className="text-greenleast text-4xl relative">just at @499 <span className="w-full h-[5px] bg-greenleast absolute -bottom-2 right-0"></span></span></h1>
                </div>
                <div className="w-full h-fit  flex justify-center items-start">
                    <div className="w-[50%] h-full  flex flex-col justify-start items-start p-20">
                        <h1 className="text-3xl/snug font-semibold font-ubuntu mb-6">
                            Be The part of <span className="text-greenleast">Path Crystal</span>
                        </h1>
                        <p className="text-justify mb-6 text-black/50 font-ubuntu"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit a porro fugit enim iste omnis. Laborum, minima! Praesentium asperiores dignissimos odit quo neque, optio porro, deleniti odio ullam ut, blanditiis dolorem. Eveniet esse deleniti totam nihil provident commodi. Quia, earum.</p>
                        <div className="grid grid-cols-2 gap-5 mb-6">
                            <div className="bg-white rounded-lg shadow-featurecard p-4 flex items-center">
                                <FaBook className="text-greenleast text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Knowledge Access</h3>
                                    <p className="text-sm text-gray-600">Vast collection of books and resources.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-featurecard p-4 flex items-center">
                                <FaLaptop className="text-greenleast text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Digital Access</h3>
                                    <p className="text-sm text-gray-600">E-books, research papers, and Wi-Fi.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-featurecard p-4 flex items-center">
                                <FaUsers className="text-greenleast text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Community Hub</h3>
                                    <p className="text-sm text-gray-600">Events and networking opportunities.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-featurecard p-4 flex items-center">
                                <FaChalkboardTeacher className="text-greenleast text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Skill Development</h3>
                                    <p className="text-sm text-gray-600">Workshops and educational programs.</p>
                                </div>
                            </div>
                        </div>
                        <button className=" bg-greenleast text-white px-7 py-2 rounded-xl font-bold cursor-pointer">Book Your Seat</button>
                    </div>
                    <div className="w-[50%] h-full  flex justify-center items-center">
                        <div className="w-[90%] h-[90%] flex justify-start items-center">
                            <Image src={student} className="rounded-3xl" alt="student"></Image>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}