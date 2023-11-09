'use client'
import { useSession } from "next-auth/react";
import { useState,useEffect } from "react"

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const {data: session} = useSession()
  useEffect(()=>{
    const fetchSearchData = async()=>{
      const response = await fetch(`/api/searchproduct?query=${query}&user=${session?.user?.email}`)
      const parseResponse = await response.json()
      setSearchData(parseResponse.products)
    }
    fetchSearchData()
  },[query])
  
  return (

<div className='container m-auto my-3'>

    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" onChange={(e)=>(setQuery(e.target.value))} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for the Product"  />
    </div>



{query && <div id="dropdown" className="z-10  bg-blue-50 divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700">
<ul className="flex justify-around items-center text-md font-bold py-2  text-black dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
   <li>
     <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Product</p>
   </li>
   <li>
     <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Quantity</p>
   </li>
   <li>
     <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Price</p>
   </li>
 </ul>

    { searchData.map((item)=>{
   return <><ul className="flex justify-around  border-b-4 border-black items-center font-semiBold py-2  text-black dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
   <li>
     <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.title}</p>
   </li>
   <li>
     <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.qty}</p>
   </li>
  <li className="flex space-x-1 items-center ">
     <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.price}</p>
   </li>
 </ul>
 <hr className="border-2 border-black" /> </>   })
}
</div>}

</div>
    
    
  )
}

export default SearchBar
