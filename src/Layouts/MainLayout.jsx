import { Outlet } from "react-router"
import Navbar from "../Reuse/Navbar"
import Footer from "../Reuse/Footer"


const MainLayout = () => {
  return (
    <div>
         <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default MainLayout