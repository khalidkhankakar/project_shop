'use client'

import { useSession } from "next-auth/react";
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter, useSearchParams } from 'next/navigation'
export const metadata = {
  title: 'Edit items'
}
function Edit() {
    const para = useSearchParams();
    const router = useRouter();
    const idOfitem = para.get('id')
    const priceOfitem = para.get('price')
    const titleOfitem = para.get('title')
    const qtyOfitem = para.get('qty')

    console.log(idOfitem, priceOfitem, titleOfitem, qtyOfitem)
  let {data:session} = useSession()
const [formData, setFormData] = useState({
    title: titleOfitem,
    qty: qtyOfitem,
    price: priceOfitem 
  });

const [truenotification, setTruenotification] = useState(false);



const handleUpdate = async (e)=>{
    e.preventDefault()

    const resp = await fetch(`/api/editproduct/${idOfitem}?title=${formData.title}&price=${formData.price}&qty=${formData.qty}`, {
        method: 'PUT'
    })
    if(resp.status === 200){
        setTruenotification(true)
    }
    setInterval(() => {
        setTruenotification(false)
      }, 100);
      router.push("/table")

}


    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev)=>({...prev, [name]:value}))
      }
  return (
<>

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
{truenotification && toast.success("Item is updated successfully")}
{session && <form className="container w-[80%] m-auto" onSubmit={handleUpdate}>
  <div className="mb-6">
    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Slug</label>
    <input onChange={handleChange} value={formData.title} type="text" name='title' id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the Product slug using dash -" required />
  </div>
  <div className="mb-6">
    <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
    <input onChange={handleChange} value={formData.qty} name="qty" type="number" id="qty" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the quantity in Stock" required />
  </div>
  <div className="mb-6">
    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
    <input onChange={handleChange} value={formData.price} type="number" name="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the price of signal Product" required />
  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Product</button>
</form>
}
</>

  )
}

export default Edit
