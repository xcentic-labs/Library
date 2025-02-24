import jwt from 'jsonwebtoken'

const KEY = process.env.JWT_KEY

export const generateToken = (name : string , phoneNumber : string , role :string)=>{
    return jwt.sign({
        name ,
        phoneNumber,
        role
    } , KEY , { expiresIn : '7d' });
}

export const verifyToken = (token : string)=>{
    return jwt.verify(token , KEY)
}