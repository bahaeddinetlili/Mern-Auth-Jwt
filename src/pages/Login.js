import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const LoginUser = async () => {
    const userobj = {
      password, email
    };
    try {
      toast.loading('Loading...')
      const response = await axios.post('/api/auth/login', userobj);
      toast.dismiss()
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("user", response.data.data)
        navigate('/')
        console.log(userobj);
      }
      else {
        toast.error(response.data.message);

      }
    }
    catch (error) {
      toast.dismiss();
      toast.error('Something went wrong');
    }

  };
  const sendResetPasswordLink = async () => {
    try {
      toast.loading('Loading...')
      const response = await axios.post('/api/auth/send-password-reset-link', {email
      });
      toast.dismiss()
      if (response.data.success) {
        toast.success(response.data.message);
        setShowForgotPassword(false)
      }
      else {
        toast.error(response.data.message);

      }
    }
    catch (error) {
      toast.dismiss();
      toast.error('Something went wrong');
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      {!showForgotPassword && (
        <div className='w-[300px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-200'>
          <h1 className='font-semibold text-3xl text-primary'>Welcome Back </h1>
          <input type="text" className='py-1 px-3 border-2 border-secondary focus:outline-none w-full ' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />

          <input type="password" className='py-1 px-3 border-2 border-secondary focus:outline-none w-full ' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />


          <div className='flex justify-between items-end'>
            <div className='flex flex-col'>
              <Link className='underline text-secondary' to='/register'>Click here to Register</Link>
              <h1 className='underline text-secondary cursor-pointer' onClick={() => setShowForgotPassword(true)}  >Forgot Password</h1>

            </div>
            <button className='py-1 px-5 text-white bg-primary' onClick={LoginUser} >LOGIN</button>
          </div>

        </div>)}
      {showForgotPassword && (
        <div className='flex flex-col space-y-5'>
          <h1 className='font-semibold text-3xl text-primary'>Enter your email </h1>
          <input type="text" className='py-1 px-3 border-2 border-secondary focus:outline-none w-full ' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className='flex justify-between items-end'>

            <button className='py-1 px-5 text-white bg-primary' onClick={sendResetPasswordLink} >
              SEND RESET PASSWORD LINK
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Login
