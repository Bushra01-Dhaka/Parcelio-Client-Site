import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../Reuse/Navbar";
import Footer from "../Reuse/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
