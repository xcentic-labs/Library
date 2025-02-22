import Link from "next/link"

export default function Header() {
    return (
        <header className="w-full h-[8vh] flex fixed top-0 bottom-0 z-50">
            <div className="w-full h-full ml-[15%] bg-primary rounded-bl-3xl flex justify-between pr-10 z-50">
                <div className="w-[15%] rounded-bl-3xl border-t-0 border-2 border-primary p-2 flex justify-center items-center bg-white">
                    <Link href='/'>
                    <h1 className="font-bold">Path Catalyst</h1>
                    </Link>
                </div>
                <nav className="w-[85%] h-full flex items-center justify-end ">
                    <ul className="w-full h-full flex items-center gap-10 justify-end">
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