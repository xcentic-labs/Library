import { BiMenuAltRight } from 'react-icons/bi';
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { MdDashboard, MdEdit, MdOutlineDrafts } from "react-icons/md";
import { FaUsers, FaUserCheck } from "react-icons/fa";
import { AiOutlineLayout } from "react-icons/ai";
import Link from 'next/link';

const menuItems = [
    {
        title: "Dashboard",
        items: [
            { name: "Dashboard", icon: <MdDashboard /> , route : '/dashboard', }
        ]
    },
    {
        title: "Layout",
        items: [
            { name: "Create Layout", icon: <MdEdit /> , route : '/addlayout', },
            { name: "Layouts", icon: <AiOutlineLayout />  , route : '/layouts', },
            // { name: "Draft Layout", icon: <MdOutlineDrafts />  ,  route : '/layout', }
        ]
    },
    {
        title: "Manage User",
        items: [
            { name: "Total User", icon: <FaUsers /> ,  route : '/users/all',  },
            { name: "Subscribed User", icon: <FaUserCheck /> ,  route : '/users/suscribeduser',  }
        ]
    },
    {
        title: "Settings",
        items: [
            { name: "General Setting", icon: <IoSettingsOutline /> ,  route : '/dashboard',  },
            { name: "Logout", icon: <IoLogOutOutline /> ,  route : '/dashboard',  }
        ]
    }
];

export default function SideBar() {
    return (
        <div className="h-[90vh] w-full bg-greenleast p-4 pr-0 flex-col z-40 transition-transform duration-300 overflow-y-scroll border-r-4 scrolbar">
            <div className="w-full">
                {menuItems.map((section, index) => (
                    <div key={index} className='mb-4'>
                        <div className="w-full h-8 px-3 flex items-center pl-0">
                            <h6 className="text-white/90 text-md font-bold">{section.title}</h6>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {section.items.map((item, i) => (
                                <li key={i}>
                                    <Link href={item.route} className="flex p-3 group hover:bg-white duration-300 rounded-lg rounded-r-none ml-2 cursor-pointer items-center gap-3">
                                        <span className="text-xl text-white group-hover:text-black">{item.icon}</span>
                                        <h2 className="text-white/90 text-sm font-semibold group-hover:text-black">{item.name}</h2>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}