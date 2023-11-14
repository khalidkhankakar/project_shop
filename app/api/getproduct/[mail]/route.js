import dbcon from "@/dbconnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    await dbcon();
    try {

        const products = await Product.find({
            creator:params.mail
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
