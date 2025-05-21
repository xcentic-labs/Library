"use client"
import { useIsLoggedIn } from "@/hooks/login";
import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import logo from '@/assets/logo.png'


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { status, name, phoneNumber, role } = useIsLoggedIn();

    const toggelMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className="w-full h-[8vh] flex fixed top-0 bottom-0 z-50">
            <div className="w-full h-full ml-[15%] bg-primary rounded-bl-3xl flex justify-between md:pr-10 pr-5 z-50">
                <div className="md:w-[15%] w-[30%] rounded-bl-3xl border-t-0 border-2 border-primary p-2 flex justify-center items-center bg-white overflow-hidden">
                    <Link href='/'>
                        <Image src={logo} className="w-36 h-16 " alt="Logo" />
                    </Link>
                </div>
                <nav className="md:w-[85%] w-[70%] h-full flex items-center justify-end">
                    <div className="md:hidden flex relative ">
                        <IoMenu size={24} onClick={toggelMenu} />
                        <ul className={`absolute view top-[100%] right-0 bg-white p-6 py-3 space-y-3 text-xl border-[3px] border-greenleast rounded-lg font-ubuntu flex-col ${isMenuOpen ? 'flex' : 'hidden'}`}>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href='/' scroll={true} onClick={toggelMenu}>Home</Link>
                            </li>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href='/allannouncement' scroll={true} onClick={toggelMenu}>Announcement</Link>
                            </li>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href="/#faclits" onClick={toggelMenu}>Facilities</Link>
                            </li>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href="/#rules" onClick={toggelMenu}>Rules</Link>
                            </li>
                            {
                                status ?
                                    <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                        <Link href={role == 'Admin' ? '/admindashboard' : '/studentdashboard'} onClick={toggelMenu}>DashBoard</Link>
                                    </li>
                                    :
                                    <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                        <Link href="/login" onClick={toggelMenu}>Login</Link>
                                    </li>
                            }
                        </ul>
                    </div>
                    <ul className="w-full h-full md:flex hidden items-center gap-10 justify-end">
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href='/' scroll={true}>Home</Link>
                        </li>
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href='/allannouncement' scroll={true}>Announcement</Link>
                        </li>
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href="/#faclits">Faclits</Link>
                        </li>
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href="/#rules">Rules</Link>
                        </li>
                        {
                            status ?
                                <Link href={role == 'Admin' ? '/admindashboard' : '/studentdashboard'} className="bg-greenleast text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-white hover:text-greenleast duration-300">
                                    DashBoard
                                </Link>
                                :
                                <Link href={'/login'} className="bg-greenleast text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-white hover:text-greenleast duration-300">
                                    Get Started
                                </Link>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}