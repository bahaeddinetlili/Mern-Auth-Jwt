import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, Toast } from 'react-hot-toast'
import axios from 'axios'
function VerifyEmail() {
    const params =useParams()
    const [emailVerified,setEmailVerified] = useState('')

    
const verifyToken= async() => {
    try {
        toast.loading()
     const response =   await axios.post("/api/auth/verfiyemail",{token: params.token});
     if(response.data.success) {
       setEmailVerified("true") 
     } else {
        setEmailVerified("false")
     }
        toast.dismiss()
    } catch (error) {
        toast.dismiss()
        setEmailVerified("false")

    }
}
useEffect(() =>{
    verifyToken()
    } ,[])
  return (
    <div className='flex min-h-screen p-5 justify-center items-center'>
      {emailVerified=="" && <h1 className='text-primary text-5xl'>please wait we are verifying your email</h1>}

      {emailVerified=='true' && <h1 className='text-primary text-5xl'>Your Email verfied successfully</h1>}

      {emailVerified=='false' && <h1 className='text-primary text-5xl'>Invalid or expired Token</h1>}


    </div>
  )
}

export default VerifyEmail
