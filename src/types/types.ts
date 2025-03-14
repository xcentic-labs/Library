
export interface User {
    name : string,
    phoneNumber : string,
    email : string,
    password : string
}

export interface auth {
    phoneNumber : string,
    password : string
}

export interface seatbody{
    seatNumber : number,
    isLocker : boolean
}


export interface bookseat{
    userId : number,
    seatNumber  : number,
}

export interface authInfo{
    authStatus : boolean,
    authInfo : {
        name : string,
        phoneNumber : string,
        role : string
    }
}
