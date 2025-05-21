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
                            Results-driven IT expert with 20 years of experience delivering innovative solutions, driving digital transformation, and leading high-performing teams. Proven track record of driving business growth, improving efficiency, and ensuring seamless technology integration. Skilled in Java,Java script, CSS, Selenium,RPA (AA,Uipath),Azure, Database of expertise with a passion for staying ahead of the curve and leveraging technology to drive business success.
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