import { auth } from "@/types/types"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export const SideBarController = () => {
    const redirect = useRouter()
    const storeData: any = (localStorage.getItem('auth'));
    const parsedStoreData: any = JSON.parse(storeData)
    const authPermission = parsedStoreData?.authPermission

    const data = !authPermission ? [] : authPermission.sort((a: any, b: any) => {
        return a.priority - b.priority
    })


    const handleLogout = async () => {
        try {
            const res = await axios.get('/api/logout');

            if (res.status === 200) {
                toast.success(res.data.message);
                redirect.push('/')
            } else {
                toast.error(res.data.error)
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error)
        }
    }
    return {
        data,
        handleLogout
    }
}

export default SideBarController