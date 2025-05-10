"use client"
import { FaPhoneAlt, FaUnlock, FaUser, } from "react-icons/fa";
import img from '@/assets/lib2.jpg'
import Image from "next/image";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import { User } from "@/types/types";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useIsLoggedIn } from "@/hooks/login";

export default function Signup() {
  const redirect = useRouter();
  const [data, setData] = useState<User>({
    name: "",
    phoneNumber: "",
    email: "",
    password: ""
  });
  const {status} = useIsLoggedIn();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(()=>{
    if(status){
      redirect.push('/studentdashboard');
    }
  },[])
  const handleSubmit = async () => {
    console.log(data)
    if (!data.name || !data.phoneNumber || !data.email || !data.password) {
      return toast.error("All Fields Are required");
    }

    try {
      const res = await axios.post(`/api/user`, JSON.stringify(data))

      if (res.status == 200) {
        redirect.push('/login');
        setData({
          name: "",
          phoneNumber: "",
          email: "",
          password: ""
        });
        return toast.success("Account created Sucessfully");
      } else {
        return toast.error(res.data.error)
      }
    } catch (error: any) {
      // console.log(error);
      return toast.error(error.response.data.error)
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <section className='w-[100vw] h-[100vh] flex justify-between items-center gap-4 md:gap-10 lg:overflow-hidden lg:flex-row flex-col'>
      <div className='flex lg:w-[50%] lg:h-full h-[50%] object-cover justify-between lg:items-center lg:flex-row bg-slate-400'>
        <Image src={img} alt="library" className="object-cover" />
      </div>

      {/* Form Section */}
      <div className='lg:w-[50%] w-full h-full  flex justify-center items-center p-5'>
        <div className='w-full max-w-[500px] p-5'>
          <h1 className="text-3xl font-bold mb-2 font-ubuntu">Sign up</h1>
          <p className="text-xl font-semibold mb-6 font-ubuntu">Welcome To Path Catalyst</p>

          <label className="mb-2 mx-1 font-medium block">Name</label>
          <div className='flex justify-between gap-3 items-center border border-gray-500 rounded-2xl px-3 mb-4'>
            <div className="flex items-center gap-3">
              <FaUser size={20} />
              <input
                type="text"
                name='name'
                className='h-12 outline-none rounded-2xl w-full'
                placeholder='Name'
                onChange={handleChange}
              />
            </div>
          </div>

          <label className="mb-2 mx-1 font-medium block">Phone Number</label>
          <div className='flex justify-between gap-3 items-center border border-gray-500 rounded-2xl px-3 mb-4'>
            <div className="flex items-center gap-3">
              <FaPhoneAlt size={20} />
              <input
                type="text"
                name='phoneNumber'
                className='h-12 outline-none rounded-2xl w-full'
                placeholder='Phone Number'
                onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>

          <label className="mb-2 mx-1 font-medium block">Password</label>
          <div className='flex items-center gap-3 border border-gray-500 rounded-2xl px-3 mb-6'>
            <FaUnlock size={20} />
            <input
              type="password"
              name='password'
              className='h-12 outline-none rounded-2xl w-full'
              placeholder='Password'
              onChange={handleChange}
            />
          </div>

          <button
            className='w-full flex justify-center items-center text-white bg-greenleast hover:bg-white hover:text-greenleast border-2 border-greenleast rounded-2xl py-3 font-bold duration-300 text-lg tracking-[2px] mb-4' onClick={handleSubmit}
          >
            Sign up
          </button>
          <p className="mb-6 w-full text-center text-greenleast font-semibold cursor-pointer hover:text-greenleastshade">Already have account? <Link href="/login" className=" hover:underline duration-300">Login</Link></p>
        </div>
      </div>
    </section>
  )
}

