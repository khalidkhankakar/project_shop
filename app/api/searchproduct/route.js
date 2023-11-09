import dbcon from "@/dbconnect";
import { NextResponse } from "next/server";
// import { MongoClient } from "mongodb";
import Product from "@/models/Product";

export async function GET(request) {
  let query = request.nextUrl.searchParams.get("query");
  let user = request.nextUrl.searchParams.get("user");
  await dbcon();
  let products = await Product.aggregate([
    {
      $match: {
        creator : user // Filter based on the user's email
      }
    },
    {
      $match: {
        $or: [
          {
            title: {
              $regex: query,
              $options: "i"
            }
          }
        ]
      }
    }
  ])
  return NextResponse.json({ success: true, products });
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }
}
