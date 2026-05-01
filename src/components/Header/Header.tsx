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
        <header className="w-[90%] max-w-6xl h-[8vh] fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="w-full h-full bg-primary rounded-xl flex items-center justify-between md:pr-10 pr-5 z-50 px-4">
                <div className="rounded-bl-3xl border-t-0 border-2 border-primary p-2 flex justify-center items-center overflow-hidden">
                    <Link href='/'>
                        <Image src={logo} className="w-20" alt="Logo" />
                    </Link>
                </div>
                <nav className="flex-1 h-full flex items-center justify-end">
                    <div className="md:hidden flex relative ">
                        <IoMenu size={24} onClick={toggelMenu} />
                        <ul className={`absolute view top-[100%] right-0 bg-white p-6 py-3 space-y-3 text-xl border-[3px] border-greenleast rounded-lg font-ubuntu flex-col ${isMenuOpen ? 'flex' : 'hidden'}`}>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href='/' scroll={true} onClick={toggelMenu}>Home</Link>
                            </li>
                            {/* <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href='/allannouncement' scroll={true} onClick={toggelMenu}>Announcement</Link>
                            </li> */}
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href="/#faclits" onClick={toggelMenu}>Facilities</Link>
                            </li>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href="/#rules" onClick={toggelMenu}>Rules</Link>
                            </li>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href="/courses" onClick={toggelMenu}>Courses</Link>
                            </li>

                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href='http://foodcourt.thepathcatalyst.com/' onClick={toggelMenu}>Food Court</Link>
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
                    <ul className="h-full md:flex hidden items-center gap-10 justify-end">
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href='/' scroll={true}>Home</Link>
                        </li>
                        {/* <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href='/allannouncement' scroll={true}>Announcement</Link>
                        </li> */}
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href="/#faclits">Faclits</Link>
                        </li>
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href="/#rules">Rules</Link>
                        </li>
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href="/courses">Courses</Link>
                        </li>
                        <Link href="http://foodcourt.thepathcatalyst.com/" className="bg-greenleast text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-white hover:text-greenleast duration-300">
                                    Food Court
                                </Link>
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