'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  return (

    <nav className="bg-gray-700">
      <div className=" flex  items-center md:px-3 px-1 justify-between mx-auto py-4">
        <Link href={'/'}><span className="self-center text-xl md:text-2xl text-white font-semibold whitespace-nowrap">InventryShop</span></Link>
          <ul className="flex items-center font-medium space-x-1 md:space-x-4 lg:space-x-5">
            <li >
              <Link href="/" className={` py-2  pl-2 pr-2 ${pathname === "/" ? "text-blue-400": "text-white"} rounded `} aria-current="page">Home</Link>
            </li>
            {session ? <li>
              <Link href="/table" className={` py-2 pl-2 pr-2 ${pathname === "/table" ? "text-blue-400": "text-white"} rounded `}>Items</Link>
            </li> : <li className="cursor-pointer text-white hover:text-blue-400"  onClick={() => signIn()}>SignUp</li>}
            {session && <li className="cursor-pointer text-white hover:text-blue-400" onClick={() =>{
            signOut();
            router.push('/');}
            }>LogOut</li>}

            <li>{session && <Image src={session?.user?.image} width={40} height={40} alt="user" className="object-contain rounded-full " />}</li>
          </ul>
      </div>
    </nav>

  )
}

export default Header
