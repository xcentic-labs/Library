import { authInfo } from "@/types/types";

export const useIsLoogedIn = ()=>{
    const storeData : any = (localStorage.getItem('auth'));
    const auth : authInfo  = JSON.parse(storeData) || {
        authStatus : false,
        authInfo : {
            id : null,
            name : null,
            phoneNumber : null,
            role : null
        }
    };
    
    if(!auth.authInfo.name || !auth.authInfo.phoneNumber || !auth.authInfo.role){
        localStorage.removeItem('auth');
        return {
            status : false,
            ...auth
        }
    }

    return {
        status : true,
        name : auth.authInfo.name,
        phoneNumber : auth.authInfo.phoneNumber,
        role : auth.authInfo.role,
        id : auth.authInfo.id
    }
}