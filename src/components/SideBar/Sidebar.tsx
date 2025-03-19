import Link from 'next/link';
import SideBarController from './SideBarcontroller';
import "@fortawesome/fontawesome-free/css/all.min.css";



interface NavProp {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

interface section {
    id: number;
    title: string;
    permitTo: string;
    priority: string;
    item: {
        id: number;
        name: string;
        icon: string;
        route: string;
        parentId: number;
    }[];
}

export default function SideBar({ isOpen, setIsOpen }: NavProp) {
    const {
        data, handleLogout
    } = SideBarController()
    return (
        <div className="h-[90vh] w-full bg-greenleast p-4 pr-0 flex-col duration-300 overflow-y-scroll lg:border-0 lg:border-r-4 scrollbar z-50">
            <div className="w-full">
                {data.map((section: section, index: number) => (
                    <div key={index} className='mb-4'>
                        <div className="w-full h-8 px-3 flex items-center pl-0">
                            <h6 className="text-white/90 text-md font-bold">{section.title}</h6>
                        </div>
                        <ul className="flex flex-col gap-2">
                            {
                                section.item.map((child, i) => {
                                    return (
                                        <li key={i}>
                                            <Link href={child.route} passHref>
                                                <div
                                                    className="flex p-3 group hover:bg-white duration-300 rounded-lg rounded-r-none ml-2 cursor-pointer items-center gap-3 z-50"
                                                    onClick={() => setIsOpen(!isOpen)}
                                                >
                                                    <span className="text-md text-white group-hover:text-black z-50">
                                                        <i className={child.icon.replace("fas", "fas ")} aria-hidden="true"></i>
                                                    </span>
                                                    <h2 className="text-white/90 text-sm font-semibold group-hover:text-black z-50">
                                                        {child.name}
                                                    </h2>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                ))}

                <div className='mb-4'>
                    <div className="w-full h-8 px-3 flex items-center pl-0">
                        <h6 className="text-white/90 text-md font-bold">Seeting</h6>
                    </div>
                    <ul className="flex flex-col gap-2">
                        <li >
                            <div
                                className="flex p-3 group hover:bg-white duration-300 rounded-lg rounded-r-none ml-2 cursor-pointer items-center gap-3 z-50"
                                onClick={handleLogout}
                            >
                                <span className="text-md text-white group-hover:text-black z-50">
                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                                </span>
                                <h2 className="text-white/90 text-sm font-semibold group-hover:text-black z-50">
                                    Logout
                                </h2>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}