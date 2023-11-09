import Header from '@/components/Header'
import './globals.css'
import { Provider } from '@/components/Provider'
import Footer from '@/components/Footer'
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export const metadata = {
  title: 'Inventry Shop',
  description: 'This is an Iventry shop you can operate CRUD operations with it.',
}

export default function RootLayout({ children, session }) {
  return (
    <Provider session={session} >
    <html lang="en">
      <body className={roboto.className}>
        <Header/>
        <section className='min-h-screen'>
        {children}
        </section>
        <Footer/>
        </body>
    </html>
    </Provider>
  )
}
