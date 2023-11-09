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

    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className=" flex  items-center justify-between mx-auto p-4">
        <Link href={'/'}><span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">InventryShop</span></Link>
          <ul className="flex font-medium md:space-x-4 lg:space-x-5">
            <li >
              <Link href="/" className={` py-2  pl-2 pr-2 ${pathname === "/" ? "text-blue-400": "text-white"} rounded `} aria-current="page">Home</Link>
            </li>
            {session ? <li>
              <Link href="/table" className={` py-2 pl-2 pr-2 ${pathname === "/table" ? "text-blue-400": "text-white"} rounded `}>Items</Link>
            </li> : <li className="cursor-pointer text-white hover:text-blue-400"  onClick={() => signIn()}>SignUp</li>}
            {session && <li className="cursor-pointer text-white hover:text-blue-400" onClick={() =>{
            signOut();
            router.push('/');}
            }>SignOut</li>}

            <li>{session && <Image src={session?.user?.image} width={40} height={40} alt="user" className="object-contain rounded-full " />}</li>
          </ul>
      </div>
    </nav>

  )
}

export default Header
