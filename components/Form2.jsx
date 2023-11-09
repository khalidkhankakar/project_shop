'use client'

import { useSession } from "next-auth/react";
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Form2() {
  let {data:session} = useSession()
const [formData, setFormData] = useState({
    title:'',
    qty:'',
    price:''
  });

const [truenotification, setTruenotification] = useState(false);
const [falsenotification, setFalsenotification] = useState(false);
const [suspense, setSuspense] = useState(false);


const handleSubmit = async (e)=>{
  setSuspense(true)
    e.preventDefault();
    const response = await fetch("/api/addproduct", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          qty: formData.qty,
          price: formData.price,
          creator: session?.user?.email
        }),
      });

      if(!response.success){
          setTruenotification(true)
      }else{
        setFalsenotification(true)
      }
      setFormData({
        title:'',
        qty:'',
        price:''
      })
        setSuspense(false)
      setInterval(() => {
        setFalsenotification(false)
        setTruenotification(false)
      }, 1);

}

    const handleChange = (e)=>{
        // setFormData({...formData, [e.target.name]:e.target.value})
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
<h1 className="text-2xl text-center my-4 font-bold">Add your item</h1>
{truenotification && toast.success("Item is add successfully")}
{falsenotification && toast.error("Item is not added")}
{session && <form className="container w-[80%] m-auto" onSubmit={handleSubmit}>
  <div className="mb-6">
    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Slug</label>
    <input onChange={handleChange} value={formData.title} type="text" name='title' id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the Product Name" required />
  </div>
  <div className="mb-6">
    <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
    <input onChange={handleChange} value={formData.qty} name="qty" type="number" id="qty" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the quantity in Stock" required />
  </div>
  <div className="mb-6">
    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
    <input onChange={handleChange} value={formData.price} type="number" name="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter the price of signal Product" required />
  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{suspense ? "Adding..." : "Add Product"}</button>
</form>
}
</>

  )
}

export default Form2
