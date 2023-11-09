import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const Notlogin = () => {
    const {data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center space-y-5 mt-4">
    {!session && <h1 className="font-bold mt-32s text-3xl">Create an account to Get started </h1>}
    {!session && <button className="hover:bg-blue-700 py-2   text-white bg-blue-500 px-6   rounded-lg text-xl" onClick={() => signIn()} >Signup</button>}
    {!session && <p className="text-green-700 text-lg container m-auto">Inventory shop software is a powerful tool that simplifies the management of merchandise and product stock for businesses of all sizes. This software offers a comprehensive suite of features, enabling users to efficiently add, edit, create, and delete items from their inventory with ease. Its user-friendly interface streamlines the entire process, making it accessible even for those with minimal technical expertise.</p>}
        {!session && <p className="text-blue-700 text-lg container m-auto">One standout feature of this inventory shop software is its robust security system, incorporating Google authentication for user accounts. This not only enhances the software's security but also provides users with a seamless and secure login experience. With Google authentication, businesses can trust that their sensitive inventory data remains protected from unauthorized access.</p>}
    </div>
  )
}

export default Notlogin