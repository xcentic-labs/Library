
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
    id? : number,
    seatNumber : string | number,
    isLocker : boolean
    index : number,
    layoutId : number,
    isBooked? : boolean,
    bookingEndDate? : Date,
    bookingStartDate? : Date,
    userId? : number | undefined |null 
}


export interface bookseat{
    userId : number,
    seatNumber  : number,
    layoutId : number,
    timePeriod : number
}

export interface authInfo {
    authStatus: boolean;
    authInfo: {
      name: string;
      phoneNumber: string;
      role: string;
      id? : number
    };
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

export interface layoutdata{
    id : number
    layoutName :string,
    pricePerMonth : number,
    pricePerWeek  :number
    layoutCols :number,
    layoutRows :number,
    boxesAt : string
    seats : seatbody[]
}

export interface newArray {
    id? :number
    index : number,
    isSeat : boolean,
    isBox : boolean,
    isLocker : boolean,
    seatNumber : string | number
    isBooked? : boolean
}
