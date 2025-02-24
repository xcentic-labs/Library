import {  NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({"message" : "Har Har Mahadev"} , {status : 200});
}