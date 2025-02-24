"use client"
import Link from "next/link"
import { useState } from "react";
import { IoMenu } from "react-icons/io5";


export default function Header() {
    const [isMenuOpen , setIsMenuOpen] = useState(false);

    const toggelMenu = ()=>{
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className="w-full h-[8vh] flex fixed top-0 bottom-0 z-50">
            <div className="w-full h-full ml-[15%] bg-primary rounded-bl-3xl flex justify-between md:pr-10 pr-5 z-50">
                <div className="md:w-[15%] w-[30%] rounded-bl-3xl border-t-0 border-2 border-primary p-2 flex justify-center items-center bg-white">
                    <Link href='/'>
                        <h1 className="font-bold">Path Catalyst</h1>
                    </Link>
                </div>
                <nav className="md:w-[85%] w-[70%] h-full flex items-center justify-end">
                    <div className="md:hidden flex relative ">
                        <IoMenu size={24} onClick={toggelMenu} />
                        <ul className={`absolute top-[100%] right-0 bg-white p-6 py-3 space-y-3 text-xl border-[3px] border-greenleast rounded-lg font-ubuntu flex-col ${isMenuOpen ? 'flex' : 'hidden'}`}>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href='/' scroll={true} onClick={toggelMenu}>Home</Link>
                            </li>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href="/#faclits" onClick={toggelMenu}>Faclits</Link>
                            </li>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href="/#rules" onClick={toggelMenu}>Rules</Link>
                            </li>
                            <li className="text-black hover:text-greenleast duration-300 cursor-pointer tracking-[3px]" >
                                <Link href="/login" onClick={toggelMenu}>Login</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="w-full h-full md:flex hidden items-center gap-10 justify-end">
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href='/' scroll={true}>Home</Link>
                        </li>
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href="/#faclits">Faclits</Link>
                        </li>
                        <li className="font-bold text-white hover:text-greenleast duration-300 cursor-pointer">
                            <Link href="/#rules">Rules</Link>
                        </li>
                        <li className="bg-greenleast text-white px-5 py-2 rounded-lg font-bold cursor-pointer hover:bg-white hover:text-greenleast duration-300">
                            <Link href='/login'>Get Started</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}