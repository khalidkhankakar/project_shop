import dbcon from "@/dbconnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


export async function DELETE(request, {params}){
    try {
        await dbcon();
        console.log(params.id);
        await Product.findByIdAndDelete(params.id)

        return NextResponse.json({
            status: 400,
          })
    } catch (error) {
        return NextResponse.json({
            status: 500,
          }) 
    }

}