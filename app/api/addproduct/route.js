import dbcon from "@/dbconnect";
import { NextResponse } from "next/server";
import Product from "@/models/Product";


export async function POST(request) {
    try {
    const body = await request.json()
    await dbcon();
    const products = await Product.create({
      title: body.title,
      qty: body.qty,
      price : body.price,
      creator: body.creator
    });
    await products.save();
    return NextResponse.json({success:true, products})

      } catch(error) {
        return NextResponse.json({success:false})
      }

}