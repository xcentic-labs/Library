import jwt from 'jsonwebtoken'
import { jwtVerify } from 'jose';

const KEY : string = process.env.JWT_KEY!

export const generateToken = (name : string , phoneNumber : string , role :string)=>{
    return jwt.sign({
        name ,
        phoneNumber,
        role
    } , KEY , { expiresIn : '7d' });
}

export const verifyToken = async (token : string | undefined)=>{
    if (!token) throw new Error('Token is required');
    const secret_key = new TextEncoder().encode(KEY);
    return await jwtVerify(token, secret_key);
}