import Image from "next/image"
import student from '@/assets/student.png'
import { LuGlassWater } from "react-icons/lu";
import { FaRegNewspaper , FaPlugCircleCheck } from "react-icons/fa6";
import { MdNetworkWifi  } from "react-icons/md";
import { GiCctvCamera } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import lib1 from '@/assets/lib.png'
import lib2 from '@/assets/lib2.jpg'



const faclits = [
    {
        title : "Clean RO Water",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <LuGlassWater className="text-3xl text-greenleast" />
    },
    {
        title : "News Paper",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <FaRegNewspaper className="text-3xl text-greenleast" />
    },
    {
        title : "Cafeteria",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <IoFastFood className="text-3xl text-greenleast" />
    },
    {
        title : "High Speed Wi-fi",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <MdNetworkWifi className="text-3xl text-greenleast" />
    },
    {
        title : "24 Hrs CCTV",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <GiCctvCamera className="text-3xl text-greenleast" />
    },
    {
        title : "Seprate Cabin With Charging Point",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <FaPlugCircleCheck className="text-3xl text-greenleast" />
    },

]

export default function Faclits() {
    return (
        <section className="w-full h-fit py-10 flex justify-center items-center bg-secondary rounded-tr-[20%] rounded-bl-[20%]" id="faclits">
            <div className="w-[50%] h-full  flex justify-center items-end">
                <div className="w-[90%] h-[90%] flex justify-end items-end">
                    <Image src={lib2} className="w-[280px] z-30 rounded-3xl" alt="library2"></Image>
                    <Image src={lib1} className="w-[270px] z-30 rounded-3xl -translate-x-12 translate-y-10" alt="library1"></Image>
                </div>
            </div>
            <div className="w-[50%] h-full  flex flex-col justify-start items-start p-20 ">
                <h1 className="text-5xl/snug font-semibold font-ubuntu mb-6 relative">
                    Faclits We <span className="text-greenleast">Offer</span>
                    <span className="w-[40%] h-[5px] bg-greenleast absolute bottom-0 right-0"></span>
                </h1>
                {
                    faclits.map((fac, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 mb-6">
                            <div>
                                {fac.icon}
                            </div>
                            <div>
                                <h1 className="font-bold mb-1">{fac.title}</h1>
                                <p className="font-ubuntu font-light text-black/80">{fac.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}