
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
    index : number,
    layoutId : number
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

export interface layoutDetails{
    id? : number
    layoutName :string,
    pricePerMonth : number,
    pricePerWeek  :number
    layoutCols? :number,
    layoutRows? :number,
    boxesAt? : string
}

export interface newArray {
    index : number,
    isSeat : boolean,
    isBox : boolean,
    isLocker : boolean,
    seatNumber : string | undefined
}
