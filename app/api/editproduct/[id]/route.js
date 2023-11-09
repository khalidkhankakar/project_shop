import dbcon from "@/dbconnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


export async function PUT(request, {params}){
  try {
    

    let title = request.nextUrl.searchParams.get("title");
    let price = request.nextUrl.searchParams.get("price");
    let qty = request.nextUrl.searchParams.get("qty");

    await dbcon()
    await Product.findByIdAndUpdate(params.id, {
      title: title,
      price: price,
      qty: qty
    })

    return NextResponse.json({
        status: 200,
      })
    } catch (error) {
      return NextResponse.json({
        status: 500,
      })
    }
}