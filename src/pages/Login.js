import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const LoginUser = () => {
    const userobj = {
      password, email
    };
    console.log(userobj);
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[300px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-200'>
        <h1 className='font-semibold text-3xl text-primary'>Welcome Back </h1>
        <input type="text" className='py-1 px-3 border-2 border-secondary focus:outline-none w-full ' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="text" className='py-1 px-3 border-2 border-secondary focus:outline-none w-full ' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />


        <div className='flex justify-between items-end'>
          <Link className='underline text-secondary' to='/register'>Click here to Register</Link>
          <button className='py-1 px-5 text-white bg-primary' onClick={LoginUser} >LOGIN</button>
        </div>
      </div>
    </div>
  )
}

export default Login
