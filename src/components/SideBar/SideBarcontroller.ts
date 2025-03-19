import { auth } from "@/types/types"
import { useRouter } from "next/navigation";
export const SideBarController = ()=>{
    const redirect = useRouter()
    const storeData : any = (localStorage.getItem('auth'));
    const parsedStoreData : any = JSON.parse(storeData)
    const authPermission  =  parsedStoreData?.authPermission

    const data = !authPermission ? [] :  authPermission.sort(( a: any ,b : any)=>{
        return a.priority - b.priority
    })


    const handleLogout = ()=>{
        localStorage.removeItem('auth');
        redirect.push('/')
    }
    return {
        data,
        handleLogout   
    }
}

export default SideBarController