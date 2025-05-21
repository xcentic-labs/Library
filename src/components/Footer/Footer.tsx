import { LuPhone } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import Link from "next/link";
import logo from '@/assets/logo.png'
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-greenleast  h-fit p-5">
      <div className="text-white/90  sm:py-8 max-w-7xl mx-auto">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 mb-10">
        <div className='w-full h-full flex justify-start  items-center mb-10 col-span-2 mr-0 md:mr-28'>
          <Image src={logo} alt="img" className='w-64 ml-10 invert' />
        </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="flex flex-col gap-2 text-sm space-y-2">
              <Link href={'/'}><li className="duration-300 cursor-pointer  hover:text-white/80">Home</li></Link>
              <Link href={'/#seatbooking'}><li className="duration-300 cursor-pointer  hover:text-white/80">Book your Seat</li></Link>
              <Link href={'/#faclits'}><li className="duration-300 cursor-pointer  hover:text-white/80">Facilities We Offer</li></Link>
              <Link href={'/#rules'}><li className="duration-300 cursor-pointer  hover:text-white/80">Our Library Rules</li></Link>
              <Link href={'/#testimonials'}><li className="duration-300 cursor-pointer  hover:text-white/80">Testimonials</li></Link>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacts</h3>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-white/90 font-semibold space-y-2">
              <li className="duration-300 cursor-pointer  hover:text-white/80 flex items-center justify-start gap-2"> <LuPhone size={18} /> +91 7011159121</li>
              <li className="duration-300 cursor-pointer  hover:text-white/80 flex items-center justify-start gap-2"> <MdOutlineMailOutline size={18} /> info@thepathcatalyst.com</li>
              <li className="duration-300 cursor-pointer  hover:text-white/80 flex items-center justify-start gap-2"> <GrLocation size={18} />Ganga Vihar, Gokalpur, Delhi</li>
            </ul>
          </div>
          <div className="col-span-2 h-full md:ml-5">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.444672591437!2d77.28192417521682!3d28.706254080729543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0015d14155%3A0x19694f7f3affd2fd!2sPath%20Catalyst%20Study%20Center!5e0!3m2!1sen!2sin!4v1740201297896!5m2!1sen!2sin" className="w-full h-full rounded-lg"></iframe>
          </div>
        </div>
      </div>
      <div className='border-t-2 max-w-7xl mx-auto border-gray-200  pt-2 flex justify-between md:flex-row flex-col items-center'>
        <p className=' text-white text-sm sm:flex hidden'>©2024 Path Catalst All rights Reserved</p>
        {/* <p className="text-white text-sm">Developed By <a href="https://xcentic.in" className=" tracking-[2px] font-semibold hover:underline hover:text-white/80 duration-300 cursor-pointer">XCENTIC</a></p> */}
        <p className="text-white text-sm">Developed By Neeraj Singh</p>
      </div>
    </footer>
  )
}

export default Footer