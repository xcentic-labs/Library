import { NextRequest, NextResponse } from "next/server";

export function GET(req : NextRequest , ){
    return NextResponse.json({"meaage" : "har har mahadev"} , {status : 200});
}