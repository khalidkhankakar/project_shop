import dbcon from "@/dbconnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    await dbcon();
    try {
        const userId = req.nextUrl.searchParams.get('mail')

        console.log(userId)
        console.log(params)
        // khalidkakar13579@gmail.com
        const products = await Product.find({
            creator:userId
        });
        
        return NextResponse.json({
            status: 200,
            products:products,
          })

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message : "Internal server error occured"
          })
    }


}