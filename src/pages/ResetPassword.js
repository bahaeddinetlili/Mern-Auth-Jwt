import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const ResetPassword = () => {

    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const params = useParams()
    const navigate = useNavigate()

    const resetPassword = async () => {

        try {
            toast.loading()
     const response =  await axios.post('/api/auth/reset-password', { password, token: params.token, })
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login")
            }
            else {
                toast.error('Expired or Invalid Link')
            }
            toast.dismiss()
        }
        catch (error) {
            toast.dismiss();
            toast.error('Something went wrong');
        }

    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-[300px] flex space-y-5 flex-col p-5 shadow-lg border border-gray-200'>
                <h1 className='font-semibold text-3xl text-primary'>CHANGE YOUR PASSWORD </h1>

                <input type="password" className='py-1 px-3 border-2 border-secondary focus:outline-none w-full ' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" className='py-1 px-3 border-2 border-secondary focus:outline-none w-full ' placeholder='ConfirmPassword' value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />


                <div className='flex justify-between items-end'>
                    <button className='py-1 px-5 text-white bg-primary' onClick={resetPassword} >Reset Password</button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
