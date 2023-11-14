'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';


const Table = () => {
    const {data: session} = useSession();
    const [tableData, setTableData] = useState([]);
    const [callfunc, setCallfunc] = useState(true)
    const [truenotification, setTruenotification] = useState(false);
    const [loader, setLoader] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    

            const fetchingData = async ()=>{
              setLoader(true)
                const resp = await fetch(`${apiUrl}/api/getproduct/dd?mail=${session?.user?.email}`)
    if (!resp.ok) {
      throw new Error(`Failed to fetch data: ${resp.status} - ${resp.statusText}`);
    }
    const parseResp = await resp.json();
    console.log('Fetched data:', parseResp);
    setTableData(parseResp.products);
                
                setLoader(false)
            }
    useEffect(()=>{
fetchingData();
          },[])
    
if(session && callfunc){
    fetchingData();
    setCallfunc(false)
}

const handleDelete = async (id)=>{
    const resp = await fetch(`/api/deleteproduct/${id}`, {
        method: 'DELETE'
    })
    if(resp.status === 200){
        setTruenotification(true)
    }
    setInterval(() => {
        setTruenotification(false)
      }, 1);

      fetchingData()

}

console.log(tableData)

    
  return (

<>

{truenotification && toast.success("Item is delete successfully")}
{session && <div>
<h1 className="text-2xl text-center my-4 font-bold">Your items</h1>
<SearchBar/>
<div className="flex flex-col container m-auto text-lg">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="container m-auto  text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-2 py-4 text-green-700">Name</th>
              <th scope="col" className="px-2 py-4 text-blue-700">Quantity</th>
              <th scope="col" className="px-2 py-4 text-purple-700">Price</th>
              <th scope="col" className="px-2 py-4 text-red-700">Modify</th>
              <th scope="col" className="px-2 py-4 ">Total price</th>
            </tr>
          </thead>
          {loader ? <div className="m-auto justify-center items-center"><Image src={"/Infinity.svg"} className="m-auto text-center" width={300} height={300} alt="loading data..."/></div> :  tableData.map((item)=>{
                return <tbody key={item._id}>
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap px-2 py-4 text-green-700 font-semibold text-lg">{item.title}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-blue-700">{item.qty}</td>
                  <td className="whitespace-nowrap px-2 py-4 text-purple-700">{item.price}</td>
                  <td className="whitespace-nowrap px-2 py-4 text-red-700">
                    <div className="space-x-4">
                    <Link href={`/edit?id=${item._id}&title=${item.title}&qty=${item.qty}&price=${item.price}`}><button className="text-green-600 hover:font-semibold ">Edit</button></Link>
                    <button onClick={()=>{
                        handleDelete(item._id)
                    }} className="text-red-600 hover:font-semibold ">Delete</button>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-4">{item.price * item.qty}</td>
                </tr>
              </tbody>
            })
         } 
         {(tableData.length <= 0 && !loader)  && <h1 className="text-2xl text-center my-4 font-bold">Not Item found. Please add item</h1>
}
        </table>
      </div>
    </div>
  </div>
</div>

</div>}
<ToastContainer
position="top-right"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
</>
  )
}

export default Table
