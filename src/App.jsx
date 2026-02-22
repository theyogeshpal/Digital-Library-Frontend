import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import NotFound from "./Pages/NotFound"



const app = () => {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<div>hello, from home</div>} />
        <Route path="/Collection" element={<div>hello, from collection</div>} />
        <Route path="/About" element={<div>hello, from About</div>} />
        <Route path="/Contact" element={<div>hello, from Contact</div>} />
        <Route path="/Login" element={<div>hello, from Login</div>} />
        <Route path="/Signup" element={<div>hello, from Signup</div>} />
        <Route path="/Profile" element={<div>hello, from Profile</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  )

}


export default app