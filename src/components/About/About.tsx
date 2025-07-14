"use client"
import Image from "next/image"
import person from '@/assets/person.jpeg'


export default function About() {
    return (
        <section className="w-full  bg-secondary">
            <div className="w-full h-fit bg-white md:rounded-bl-[20%] p-5 md:py-10">
                <div className="w-full h-fit  flex lg:flex-row-reverse flex-col-reverse justify-center items-start">
                    <div className="lg:w-[50%] h-[50%] lg:h-full  flex flex-col justify-start items-start p-1 md:p-20">
                        <h1 className="text-2xl md:text-3xl/snug font-semibold font-ubuntu mb-6">
                            About <span className="text-greenleast">Me</span>
                        </h1>
                        <p className="text-justify mb-6 text-black/70 font-ubuntu">
                        Experienced IT Professional | 20+ Years in Software Development & Automation Seasoned IT expert with over two decades of delivering innovative solutions and leading digital transformation initiatives. Proven track record in driving business growth, enhancing efficiency, and ensuring seamless technology integration. Skilled in Java, JavaScript, CSS, Selenium, RPA (Automation Anywhere, UiPath), Azure, and database management. Passionate about leveraging technology to propel business success and staying ahead of industry trends.
                        </p>
                        
                        
                        <a href="tel:+917011159121" className=" bg-greenleast text-white px-7 py-2 rounded-xl font-bold cursor-pointer">Connect With Me</a>
                        
                    </div>
                    <div className="lg:w-[50%] h-[50%] lg:h-full  flex justify-center items-center ">
                        <div className="lg:w-[90%] w-full h-full lg:h-[90%] flex justify-center items-end">
                            <Image src={person} className="rounded-xl h-72 w-auto" alt="student"></Image>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}