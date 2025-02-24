import { FaPhoneAlt, FaUnlock , FaUser,  } from "react-icons/fa";
import img from '@/assets/lib2.jpg'
import Image from "next/image";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
export default function Signup(){
  
  return (
    <section className='w-[100vw] h-[100vh] flex justify-between items-center gap-4 md:gap-10 lg:overflow-hidden lg:flex-row flex-col'>
    <div className='flex lg:w-[50%] lg:h-full h-[50%] object-cover justify-between lg:items-center lg:flex-row bg-slate-400'>
        <Image src={img} alt="library" className="object-cover"/>  
    </div>

    {/* Form Section */}
    <div className='lg:w-[50%] w-full h-full  flex justify-center items-center p-5'>
      <div className='w-full max-w-[500px] p-5'>
        <h1 className="text-3xl font-bold mb-2 font-ubuntu">Sign up</h1>
        <p className="text-xl font-semibold mb-6 font-ubuntu">Welcome To Path Crystal</p>

        <label className="mb-2 mx-1 font-medium block">Name</label>
        <div className='flex justify-between gap-3 items-center border border-gray-500 rounded-2xl px-3 mb-4'>
          <div className="flex items-center gap-3">
            <FaUser size={20} />
            <input 
              type="text" 
              name='name' 
              className='h-12 outline-none rounded-2xl w-full' 
              placeholder='Name'  
            />
          </div>
        </div>

        <label className="mb-2 mx-1 font-medium block">Phone Number</label>
        <div className='flex justify-between gap-3 items-center border border-gray-500 rounded-2xl px-3 mb-4'>
          <div className="flex items-center gap-3">
            <FaPhoneAlt size={20} />
            <input 
              type="text" 
              name='phone' 
              className='h-12 outline-none rounded-2xl w-full' 
              placeholder='Phone Number'  
            />
          </div>
        </div>

        <label className="mb-2 mx-1 font-medium block">Email</label>
        <div className='flex items-center gap-3 border border-gray-500 rounded-2xl px-3 mb-6'>
          <MdEmail size={20} />
          <input 
            type="email" 
            name='email' 
            className='h-12 outline-none rounded-2xl w-full' 
            placeholder='Email' 
          />
        </div>

        <label className="mb-2 mx-1 font-medium block">Password</label>
        <div className='flex items-center gap-3 border border-gray-500 rounded-2xl px-3 mb-6'>
          <FaUnlock size={20} />
          <input 
            type="password" 
            name='Password' 
            className='h-12 outline-none rounded-2xl w-full' 
            placeholder='Password' 
          />
        </div>

        <button 
          className='w-full flex justify-center items-center text-white bg-greenleast hover:bg-white hover:text-greenleast border-2 border-greenleast rounded-2xl py-3 font-bold duration-300 text-lg tracking-[2px] mb-4' 
        >
          Sign up
        </button>
        <p className="mb-6 w-full text-center text-greenleast font-semibold cursor-pointer hover:text-greenleastshade">Already have account? <Link href="/login" className=" hover:underline duration-300">Login</Link></p>
      </div>
    </div>
  </section>
  )
}

