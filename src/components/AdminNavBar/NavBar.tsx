import Image from "next/image"
import user from '@/assets/man-user-circle-icon (1).png'
import logo from  '@/assets/logo.png'
import Link from "next/link"
import { RiMenu3Line } from "react-icons/ri";
import { useIsLoggedIn } from "@/hooks/login";

interface NavProp {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void
}

const Navbar = ({ isOpen, setIsOpen }: NavProp) => {
  const {name , phoneNumber } = useIsLoggedIn()
  return (
    <div className='w-full h-fit py-4 bg-primary  md:px-10 shadow flex items-center justify-between z-10'>
      <div>
        <Link href='/'>
          <Image src={logo} className="w-36 h-16 " alt="Logo" />
        </Link>
      </div>
      <div className='justify-end gap-2 items-center flex'>
        <div className="p-1 border- mr-4 rounded-md border-greenleast lg:hidden flex">
          <RiMenu3Line className={`text-xl text-greenleast font-extrabold cursor-pointer duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`} onClick={() => setIsOpen(!isOpen)} />
        </div>
        <div className=' w-12 h-12 rounded-full md:flex hidden'>
          <Image src={user} className="w-full h-full scale-75" alt="USER Image" />
        </div>
        <div className=' flex-col items-start justify-center md:flex hidden'>
          <h1 className='font-bold text-sm capitalize'>{name}</h1>
          <p className='text-xs'>+91 {phoneNumber}</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar