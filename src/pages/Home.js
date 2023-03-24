import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
const user = JSON.parse(localStorage.getItem('user'))
const navigate =useNavigate()

  useEffect(() => {
   if(!user)
   {
navigate("/login")
   }
  },[])
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <h1 className='text-5xl font-semibold text-primary'>HOME</h1>
    </div>
  )
}

export default Home
