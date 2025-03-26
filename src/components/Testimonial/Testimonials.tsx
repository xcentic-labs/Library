import Image from "next/image";
import { FiUser } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import person from '@/assets/student.png'

const testimonial = [1, 2, 3, 4, 5, 6]
const Testimonial = () => {
    return (
        <div className="w-full py-10" id="testimonials">
            <div className="max-w-7xl mx-auto p-4">
                <div className="flex justify-center items-center h-fit">
                    <p className="flex justify-center items-center border-[1px] border-greenleast px-3 rounded-lg text-xs  gap-1 mb-4 py-1 text-greenleast font-semibold">
                        <FiUser size={12} /><span className="text-xs -translate-y-[1px]  font-semibold">Customers</span>
                    </p>
                </div>
                <h1 className="text-3xl md:text-5xl/tight font-ubuntu text-center font-bold capitalize mb-4">See what Student Says</h1>
                <p className="text-xs md:text-sm text-center text-black/50 mb-10">{`Here's what some of our student say about our Library.`}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
                    {
                        testimonial.map((item , index) => (
                            <div key={index} className="w-full -h-[200px]  rounded-2xl shadow-reviwcard p-5 flex flex-col justify-between  gap-3 mb-4">
                                <p className=" font-sans  text-sm text-justify text-black/50">
                                    <span className=" font-bold text-2xl text-black">❛❛</span><br /> {`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur consectetur exercitationem officiis ea enim vero. Molestias delectus, libero, ratione quaerat quam`}
                                </p>
                                <div className="flex gap-4 items-center">
                                    <Image src={person} alt="" className="rounded-full h-10 w-10 overflow-hidden" width={50} height={50} />
                                    <div>
                                        <h2 className="text-xs font-bold mb-1">ujjwal Sharma</h2>
                                        <p className="text-xs font-light">Co-founder Xcentic</p>
                                    </div>
                                    <div className="flex gap-1 justify-start items-center ml-auto">
                                    <FaStar className="text-xs text-orangeleast" />
                                    <FaStar className="text-xs text-orangeleast" />
                                    <FaStar className="text-xs text-orangeleast" />
                                    <FaStar className="text-xs text-orangeleast" />
                                    <FaStar className="text-xs text-orangeleast" />
                                        <p className="text-xs">4.8</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default Testimonial