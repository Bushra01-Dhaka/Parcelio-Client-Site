import { Outlet } from "react-router"
import Navbar from "../Reuse/Navbar"


const MainLayout = () => {
  return (
    <div>
         <Navbar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout