
export interface User {
    id?: number,
    name: string,
    phoneNumber: string,
    email: string,
    password: string
    role?: string,
    seat?: seatbody[],
    motherName?  : string,
    fatherName? : string,
    AadharNumber?: string,
    isProfileComplete : boolean
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
    slot? : slot
    isBlocked?: boolean,
    bookingEndDate?: Date,
    bookingStartDate?: Date,
    userId?: number | undefined | null
    layout?: {
        layoutName: string
    }
}


export interface bookseat {
    userId: number,
    seatNumber: number,
    layoutId: number,
    timePeriod: number,
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    slot: slot,
    tnxId : string
    txnDate : string
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
    seatNumber: string | number | undefined
    isBooked?: boolean
    isBlocked?: boolean
}


export interface counselling {
    id?: number,
    name: string,
    price: number,
    benefits: string
}

export interface session {
    id: number,
    status: boolean,
    counsellingId: number,
    userId: number,
    createrAt: Date
    counselling: counselling,
    bookedBy: {
        email: string,
        phoneNumber: string,
        name: string
    }
}

enum slot {
    Morning = "MORNING",
    Afternoon = "AFTERNOON",
    Evening = "EVENING",
}
