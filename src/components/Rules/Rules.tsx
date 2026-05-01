"use client"
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import lib1 from '@/assets/pathlib4.png'
import lib2 from '@/assets/pathlib3.png'

const sharedRules = [
    {
        rule: "Keep the Space Quiet",
        description: "Maintain a calm atmosphere in both the library and co-working areas so everyone can focus on study and work."
    },
    {
        rule: "Respect Shared Furniture",
        description: "Use chairs, tables, desks, and charging points carefully and leave them clean for the next visitor."
    },
    {
        rule: "Keep Phones on Silent",
        description: "Phone calls and loud notifications are not allowed inside the reading and co-working zones."
    },
    {
        rule: "Use Books and Resources Carefully",
        description: "All books, magazines, and study materials must be handled carefully and returned to their proper place."
    },
    {
        rule: "Follow Workstation Guidelines",
        description: "Co-working desks and library computers are for learning, reading, and productive work only."
    },
    {
        rule: "Keep Food and Drinks Limited",
        description: "Only allow refreshments in designated areas to keep the library and co-working space clean and comfortable."
    }
];



const Rules: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full h-fit bg-white md:bg-secondary">
            <section className="w-full h-fit py-5 sm:py-10 flex lg:flex-row lg:gap-0  gap-12 flex-col justify-center   items-center bg-white rounded-tr-[20%]" id="rules">
                <div className="lg:w-[50%] md:h-full h-[50%] w-full  flex flex-col justify-start items-start p-5 sm:p-10 lg:p-20 ">
                    <h1 className=" text-3xl md:text-5xl/snug font-semibold font-ubuntu mb-6 relative sm:text-left text-center">
                        Co-Working & Library <span className="text-greenleast">Rules</span>
                        <span className="w-1/2 h-[5px] bg-greenleast absolute -bottom-2 right-0"></span>
                    </h1>
                    {sharedRules.map((rule, index) => (
                        <div key={index} className="border-b border-gray-300 py-4">
                            <button
                                className="w-full text-left text-sm font-bold sm:text-md flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                {rule.rule}
                                <span className={`text-lg duration-300 ${openIndex == index ? 'rotate-[180deg]' : 'rotate-[0deg]'}`}><IoIosArrowDown /></span>
                            </button>
                            <div
                                className={`transition-all overflow-hidden ${openIndex === index ? "max-h-40 opacity-100 py-2" : "max-h-0 opacity-0"}`}
                            >
                                <p className="text-gray-700 text-md sm:text-lg">{rule.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:w-[50%] md:h-full h-[50%] w-full flex justify-center lg:items-end items-center">
                    <div className="lg:w-[90%] lg:h-[90%] w-full h-full flex  lg:justify-end justify-center lg:items-end items-end lg:p-0 sm:pl-0 pl-8">
                        <Image src={lib2} className="lg:w-[280px] md:w-[250px] w-[180px] z-30 rounded-3xl" alt="library2"></Image>
                        <Image src={lib1} className="lg:w-[270px] md:w-[230px] w-[180px] z-30 rounded-3xl -translate-x-12 translate-y-10" alt="library1"></Image>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Rules;