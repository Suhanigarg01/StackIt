import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import logo from '../assets/logo.png'
// import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {user} = useUser()
    const {openSignIn} = useClerk()

    const navigate = useNavigate()

    
  return (
    
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
      <Link to='/' className='max-md:flex-1'>
        <img src={logo} alt="" className='w-36 h-20'/>
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 font-medium text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 md:px-8 py-3 max-md:h-screen md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-all duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

  <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-white' onClick={() => setIsOpen(!isOpen)} />

  <Link
    onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
    to='/'
    className='text-white hover:bg-white/20 px-4 py-2 rounded-full transition'
  >
    Home
  </Link>

  <Link
    onClick={() => { scrollTo(0, 0); setIsOpen(false) }}
    to='/ask-question'
    className='text-white hover:bg-white/20 px-4 py-2 rounded-full transition'
  >
    Ask new question
  </Link>

</div>

    <div className='flex items-center gap-8'>
        {
            !user ? (
                <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>
            ) : (
                <UserButton>
                </UserButton>
            )
        }
        
    </div>

    
    <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>

    </div>
  )
}

export default Navbar
