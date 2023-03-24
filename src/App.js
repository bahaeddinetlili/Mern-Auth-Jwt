import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast" 
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
<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
   </Routes>
   
   </BrowserRouter>
    
  );
}

export default App;
