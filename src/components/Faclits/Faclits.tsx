import Image from "next/image"
import { LuGlassWater } from "react-icons/lu";
import { FaRegNewspaper , FaPlugCircleCheck } from "react-icons/fa6";
import { MdNetworkWifi  } from "react-icons/md";
import { GiCctvCamera } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import lib1 from '@/assets/pathlib5.jpg'
import lib2 from '@/assets/pathlib1.png'



const faclits = [
    {
        title : "Clean RO Water",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <LuGlassWater className="text-3xl text-greenleast" />
    },
    {
        title : "News Paper",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <FaRegNewspaper className="sm:text-3xl text-2xl text-greenleast" />
    },
    {
        title : "Cafeteria",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <IoFastFood className="sm:text-3xl text-2xl text-greenleast" />
    },
    {
        title : "High Speed Wi-fi",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <MdNetworkWifi className="sm:text-3xl text-2xl text-greenleast" />
    },
    {
        title : "24 Hrs CCTV",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <GiCctvCamera className="sm:text-3xl text-2xl text-greenleast" />
    },
    {
        title : "Seprate Cabin With Charging Point",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        icon: <FaPlugCircleCheck className="sm:text-3xl text-2xl text-greenleast" />
    },

]

export default function Faclits() {
    return (
        <section className="w-full h-fit py-5 sm:py-10 flex lg:flex-row flex-col lg:gap-0  gap-12 justify-center items-center bg-white md:bg-secondary rounded-tr-[20%] rounded-bl-[20%]" id="faclits">
            <div className="lg:w-[50%] md:h-full h-[50%] w-full flex justify-center lg:items-end items-center">
                <div className="lg:w-[90%] lg:h-[90%] w-full h-full flex lg:justify-end justify-center lg:items-end items-end lg:p-0 sm:pl-0 pl-8">
                    <Image src={lib2} className="lg:w-[280px] md:w-[250px] w-[180px] z-30 rounded-3xl" alt="library2"></Image>
                    <Image src={lib1} className="lg:w-[270px] md:w-[230px] w-[180px] z-30 rounded-3xl -translate-x-12 translate-y-10" alt="library1"></Image>
                </div>
            </div>
            <div className="lg:w-[50%] md:h-full h-[50%] w-full  flex flex-col justify-start items-start p-4 sm:p-10 lg:p-20 ">
                <h1 className="lg:text-5xl/snug md:text-4xl/snug font-semibold font-ubuntu mb-6 relative  text-3xl/snug">
                    Faclits We <span className="text-greenleast">Offer</span>
                    <span className="w-[40%] h-[3px] md:h-[5px] bg-greenleast absolute bottom-0 right-0"></span>
                </h1>
                {
                    faclits.map((fac, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                            <div>
                                {fac.icon}
                            </div>
                            <div>
                                <h1 className="font-bold mb-1">{fac.title}</h1>
                                <p className="font-ubuntu md:text-md text-sm font-light text-black/80">{fac.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}