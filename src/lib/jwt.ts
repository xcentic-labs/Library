import jwt from 'jsonwebtoken'

const KEY : string = process.env.JWT_KEY!

export const generateToken = (name : string , phoneNumber : string , role :string)=>{
    return jwt.sign({
        name ,
        phoneNumber,
        role
    } , KEY , { expiresIn : '7d' });
}

export const verifyToken = (token : string | undefined)=>{
    if(!token) return ""
    return jwt.verify(token , KEY)
}