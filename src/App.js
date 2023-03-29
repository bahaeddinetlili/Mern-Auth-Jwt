import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast"
import VerifyEmail from "./pages/VerifyEmail.js";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (

    /*<div className="flex justify-center items-center h-screen flex-col space-y-5">
      <button className="bg-blue-500 py-2 px-5 text-white ">LOGIN</button>

      <input type='text' className='border-2 border-gray-500 py-2 px-5' placeholder="username"/>
      <input type='text' className='border-2 border-gray-500 py-2 px-5' placeholder="password"/>

    </div>
    */
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false} 
      />
      <Routes>
        <Route path="/" element={
        <ProtectedRoutes>
          <Home />
          </ProtectedRoutes>
        } 
        />
        <Route path="/login" element={
        <PublicRoutes>
          <Login />
          </PublicRoutes>
        } 
        />
        <Route path="/register" element={
        <PublicRoutes>
          <Register />
          </PublicRoutes>
        } />
             <Route path="/VerifyEmail/:token" element={
        <PublicRoutes>
          <VerifyEmail />
          </PublicRoutes>
        } />
               <Route path="/resetPassword/:token" element={
        <PublicRoutes>
          <ResetPassword />
          </PublicRoutes>
        } />
      </Routes>

    </BrowserRouter>

  );
}
export function ProtectedRoutes({children}) {
  const user = localStorage.getItem('user')
  if ( user !== "" && user ) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}
export function PublicRoutes({children}) {
  const user = localStorage.getItem('user')
  if ( user !== "" && user ) {
    return <Navigate to ="/"/>
  } else {
    return children
  }
}
export default App;
