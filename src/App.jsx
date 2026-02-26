import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import NotFound from "./Pages/NotFound"
import Signup from "./Pages/Signup"
import Home from "./Pages/Home"
import Collection from "./Pages/Collection"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Login from "./Pages/Login"
import Profile from "./Pages/Profile"
import ForgotPassword from "./Pages/ForgotPassword"
import Terms from "./Pages/Terms"
import BookDetails from "./Pages/BookDetails"
import ScrollToTop from "./components/ScrollToTop"
import { DarkModeProvider } from "./context/DarkModeContext"

const app = () => {

  return (
    <DarkModeProvider>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </DarkModeProvider>
  )

}


export default app