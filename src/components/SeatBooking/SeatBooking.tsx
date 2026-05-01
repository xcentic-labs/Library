"use client"
import Image from "next/image"
import course from '@/assets/course.jpg'
import cowork from '@/assets/cowork.jpg'
import food from '@/assets/food.jpeg'
import { FaBook, FaUsers, FaLaptop, FaChalkboardTeacher } from "react-icons/fa";
import { useIsLoggedIn } from "@/hooks/login";
import Link from "next/link";


export default function SeatBooking() {
    const { status } = useIsLoggedIn()
    return (
        <section className="w-full ">
            <div className="w-full h-fit bg-white md:rounded-bl-[20%] p-5 md:py-10">
                <div className="max-w-7xl mx-auto p-4 ">
                    <h1 className="text-3xl/snug md:text-4xl/snug font-semibold text-center mb-6 font-ubuntu">
                        Discover Our <span className="text-greenleast">Facilities</span>
                    </h1>
                    
                </div>
                <div className="w-full h-fit  flex lg:flex-row flex-col-reverse justify-center items-start">
                    <div className="lg:w-[50%] h-[50%] lg:h-full  flex flex-col justify-start items-start p-1 md:p-20">
                        <h1 className="text-2xl md:text-3xl/snug font-semibold font-ubuntu mb-6">
                            Be The Part of <span className="text-greenleast">Co-Working Space</span>
                        </h1>

                        <p className="text-justify mb-6 text-black/50 font-ubuntu">
                            Work, learn, and grow in a productive co-working environment designed for
                            students, freelancers, startups, and professionals. Our co-working space
                            provides a peaceful atmosphere, high-speed internet, comfortable seating,
                            and the perfect place to focus on your goals.
                        </p>

                        <div className="grid grid-cols-2 gap-5 mb-6">
                            <div className="bg-white rounded-lg shadow-featurecard p-4 flex sm:flex-row flex-col items-start sm:items-center sm:gap-0 gap-2">
                                <FaBook className="text-greenleast text-2xl sm:text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Quiet Workspace</h3>
                                    <p className="text-sm text-gray-600">
                                        Peaceful and distraction-free environment.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-featurecard p-4 flex sm:flex-row flex-col items-start sm:items-center sm:gap-0 gap-2">
                                <FaLaptop className="text-greenleast text-2xl sm:text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">High-Speed Internet</h3>
                                    <p className="text-sm text-gray-600">
                                        Fast Wi-Fi for seamless productivity.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-featurecard p-4 flex sm:flex-row flex-col items-start sm:items-center sm:gap-0 gap-2">
                                <FaUsers className="text-greenleast text-2xl sm:text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Professional Network</h3>
                                    <p className="text-sm text-gray-600">
                                        Connect with creators and professionals.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-featurecard p-4 flex sm:flex-row flex-col items-start sm:items-center sm:gap-0 gap-2">
                                <FaChalkboardTeacher className="text-greenleast text-2xl sm:text-4xl mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">Meeting Support</h3>
                                    <p className="text-sm text-gray-600">
                                        Ideal for team discussions and planning.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button className="bg-greenleast text-white px-7 py-2 rounded-xl font-bold cursor-pointer">
                            Book Your Space
                        </button>
                    </div>
                    <div className="lg:w-[50%] h-[50%] lg:h-full  flex justify-center items-center ">
                        <div className="lg:w-[90%] w-full h-full lg:h-[90%] flex justify-start items-center">
                            <Image src={cowork} className="rounded-3xl" alt="student"></Image>
                        </div>
                    </div>
                </div>
            </div>
            {/* Added two more similar sections: Food Court & Computer Courses */}

            <section className="w-full">
                {/* FOOD COURT SECTION */}
                <div className="w-full h-fit bg-white md:rounded-tr-[20%] p-5 md:py-10">
                    <div className="w-full h-fit flex lg:flex-row flex-col justify-center items-start">
                        <div className="lg:w-[50%] h-[50%] lg:h-full flex justify-center items-center">
                            <div className="lg:w-[90%] w-full h-full lg:h-[90%] flex justify-start items-center">
                                <Image
                                    src={food}
                                    className="rounded-3xl"
                                    alt="food court"
                                />
                            </div>
                        </div>

                        <div className="lg:w-[50%] h-[50%] lg:h-full flex flex-col justify-start items-start p-1 md:p-20">
                            <h1 className="text-2xl md:text-3xl/snug font-semibold font-ubuntu mb-6">
                                Enjoy Our <span className="text-greenleast">Food Court</span>
                            </h1>

                            <p className="text-justify mb-6 text-black/50 font-ubuntu">
                                A peaceful study environment becomes even better with delicious and
                                healthy food options. Our food court provides hygienic meals,
                                snacks, tea, coffee, and refreshments to keep you energized
                                throughout your learning journey.
                            </p>

                            <div className="grid grid-cols-2 gap-5 mb-6">
                                <div className="bg-white rounded-lg shadow-featurecard p-4">
                                    <h3 className="text-lg font-semibold">Healthy Meals</h3>
                                    <p className="text-sm text-gray-600">
                                        Nutritious and fresh food daily.
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-featurecard p-4">
                                    <h3 className="text-lg font-semibold">Quick Snacks</h3>
                                    <p className="text-sm text-gray-600">
                                        Fast bites for short study breaks.
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-featurecard p-4">
                                    <h3 className="text-lg font-semibold">Tea & Coffee</h3>
                                    <p className="text-sm text-gray-600">
                                        Stay fresh and focused anytime.
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-featurecard p-4">
                                    <h3 className="text-lg font-semibold">Comfort Space</h3>
                                    <p className="text-sm text-gray-600">
                                        Relax, eat, and recharge peacefully.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="http://foodcourt.thepathcatalyst.com/"
                                className="bg-greenleast text-white px-7 py-2 rounded-xl font-bold cursor-pointer inline-flex items-center justify-center"
                            >
                                Explore Food Court
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            <section className="w-full">
                {/* COMPUTER COURSES SECTION */}
                <div className="w-full h-fit bg-white md:rounded-bl-[20%] p-5 md:py-10">
                    <div className="w-full h-fit flex lg:flex-row flex-col-reverse justify-center items-start">
                        <div className="lg:w-[50%] h-[50%] lg:h-full flex flex-col justify-start items-start p-1 md:p-20">
                            <h1 className="text-2xl md:text-3xl/snug font-semibold font-ubuntu mb-6">
                                Learn with <span className="text-greenleast">Computer Courses</span>
                            </h1>

                            <p className="text-justify mb-6 text-black/50 font-ubuntu">
                                We offer practical and career-oriented computer courses designed
                                for students and professionals. Learn coding, MS Office, graphic
                                designing, web development, and much more with expert guidance.
                            </p>

                            <div className="grid grid-cols-2 gap-5 mb-6">
                                <div className="bg-white rounded-lg shadow-featurecard p-4">
                                    <h3 className="text-lg font-semibold">Programming</h3>
                                    <p className="text-sm text-gray-600">
                                        Learn coding with real projects.
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-featurecard p-4">
                                    <h3 className="text-lg font-semibold">Office Tools</h3>
                                    <p className="text-sm text-gray-600">
                                        Excel, Word, PowerPoint & more.
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-featurecard p-4">
                                    <h3 className="text-lg font-semibold">Web Development</h3>
                                    <p className="text-sm text-gray-600">
                                        Build websites and web apps.
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg shadow-featurecard p-4">
                                    <h3 className="text-lg font-semibold">Certification</h3>
                                    <p className="text-sm text-gray-600">
                                        Boost your career with certificates.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/courses"
                                className="bg-greenleast text-white px-7 py-2 rounded-xl font-bold cursor-pointer inline-flex items-center justify-center"
                            >
                                Explore Courses
                            </Link>
                        </div>

                        <div className="lg:w-[50%] h-[50%] lg:h-full flex justify-center items-center">
                            <div className="lg:w-[90%] w-full h-full lg:h-[90%] flex justify-start items-center">
                                <Image
                                    src={course}
                                    className="rounded-3xl"
                                    alt="computer courses"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}