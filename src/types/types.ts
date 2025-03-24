
export interface User {
    id? : number,
    name: string,
    phoneNumber: string,
    email: string,
    password: string
    role? : string,
    seat? : seatbody[]
}

export interface auth {
    phoneNumber: string,
    password: string
}

export interface seatbody {
    id?: number,
    seatNumber: string | number,
    isLocker: boolean
    index: number,
    layoutId: number,
    isBooked?: boolean,
    bookingEndDate?: Date,
    bookingStartDate?: Date,
    userId?: number | undefined | null
    layout? : {
        layoutName : string
    }
}


export interface bookseat {
    userId: number,
    seatNumber: number,
    layoutId: number,
    timePeriod: number,
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
}

export interface authInfo {
    authStatus: boolean;
    authInfo: {
        name: string;
        phoneNumber: string;
        role: string;
        id?: number
    };
}


export interface layoutDetails {
    id?: number
    layoutName: string,
    MonthlyFee: {
        id?: number,
        month: number
        fee: number,
        layoutId?: number
    }[]
    layoutCols?: number,
    layoutRows?: number,
    boxesAt?: string
}

export interface layoutdata {
    id: number
    layoutName: string,
    Fee: {
        id?: number,
        month: number
        fee: number,
        layoutId?: number
    }[]
    layoutCols: number,
    layoutRows: number,
    boxesAt: string
    seats: seatbody[]
}

export interface newArray {
    id?: number
    index: number,
    isSeat: boolean,
    isBox: boolean,
    isLocker: boolean,
    seatNumber: string | number
    isBooked?: boolean
}
