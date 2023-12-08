'use client'
import { Header } from './components/header'
import { Footer } from './components/footer'

export default function Home({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='m-auto'>{children}</div>
      <Footer />
    </div>
  )
}
