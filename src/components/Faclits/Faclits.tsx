import Image from "next/image"
import { FaBookOpen, FaLaptopCode, FaPlugCircleCheck } from "react-icons/fa6";
import { MdNetworkWifi  } from "react-icons/md";
import { GiCctvCamera } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { LuGlassWater } from "react-icons/lu";
import { FaRegNewspaper } from "react-icons/fa6";
import coworkp from '@/assets/coworkp.jpg'
import cowork from '@/assets/cowork.jpg'



const faclits = [
    {
        title : "Co Working Space",
        desc: "A focused workspace with Wi-Fi, charging points, and a calm environment for productive work.",
        icon: <MdNetworkWifi className="sm:text-3xl text-2xl text-greenleast" />
    },
    {
        title : "Courses",
        desc: "Practical computer courses designed to build skills in coding, office tools, and web development.",
        icon: <FaLaptopCode className="sm:text-3xl text-2xl text-greenleast" />
    },
    {
        title : "Food Court",
        desc: "Fresh meals, tea, coffee, and snacks to keep students energized throughout the day.",
        icon: <IoFastFood className="sm:text-3xl text-2xl text-greenleast" />
    },
    {
        title : "Clean RO Water",
        desc: "Safe drinking water available throughout the day for students and visitors.",
        icon: <LuGlassWater className="text-3xl text-greenleast" />
    },
    {
        title : "Daily Newspaper",
        desc: "Stay updated with news, current affairs, and useful reading material on site.",
        icon: <FaRegNewspaper className="sm:text-3xl text-2xl text-greenleast" />
    },
    {
        title : "24/7 CCTV Security",
        desc: "Surveillance coverage helps maintain a safer and more secure environment.",
        icon: <GiCctvCamera className="sm:text-3xl text-2xl text-greenleast" />
    },

]

export default function Faclits() {
    return (
        <section className="w-full h-fit py-5 sm:py-10 flex lg:flex-row flex-col lg:gap-0  gap-12 justify-center items-center bg-white md:bg-secondary rounded-tr-[20%] rounded-bl-[20%]" id="faclits">
            <div className="lg:w-[50%] md:h-full h-[50%] w-full flex justify-center lg:items-end items-center">
                <div className="lg:w-[90%] lg:h-[90%] w-full h-full flex lg:justify-end justify-center lg:items-end items-end lg:p-0 sm:pl-0 pl-8">
                    <Image src={coworkp} className="lg:w-[280px] md:w-[250px] w-[180px] z-30 rounded-3xl" alt="library2"></Image>
                    <Image src={cowork} className="lg:w-[270px] md:w-[230px] w-[180px] z-30 rounded-3xl -translate-x-12 translate-y-10" alt="library1"></Image>
                </div>
            </div>
            <div className="lg:w-[50%] md:h-full h-[50%] w-full  flex flex-col justify-start items-start p-4 sm:p-10 lg:p-20 ">
                <h1 className="lg:text-5xl/snug md:text-4xl/snug font-semibold font-ubuntu mb-6 relative  text-3xl/snug">
                    What We <span className="text-greenleast">Offer</span>
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