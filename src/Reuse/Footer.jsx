import { Link } from "react-router";
import logo from "../assets/logo.png"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="flex justify-around items-center min-h-[40vh] bg-secondary text-slate-400 p-10 text-center">
      <div className="w-full lg:w-[700px] mx-auto">
        {/* logo */}
        <div className="flex justify-center items-end">
          <img src={logo} alt="" />
          <p className="text-2xl lg:text-3xl text-slate-100 font-extrabold -ml-4">Parcelio</p>
        </div>
        <p className="py-4">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
        
        <div className="py-6 text-sm flex flex-wrap lg:flex-row border-0 border-slate-800 border-t-1 border-b-1  border-dashed justify-evenly items-center gap-6 lg:px-6">
             <Link><p className="hover:text-primary">Services</p></Link>
             <Link><p className="hover:text-primary">Coverage</p></Link>
             <Link><p className="hover:text-primary">About Us</p></Link>
             <Link><p className="hover:text-primary">Pricing</p></Link>
             <Link><p className="hover:text-primary">Be A Rider</p></Link>
        </div>

        <div className="py-4 flex justify-center items-center gap-6 px-6">
            <p className="text-2xl text-blue-800 rounded-full"><FaLinkedin/></p>
            <p className="text-2xl text-red-400 rounded-full"><FaInstagramSquare/></p>
            <p className="text-2xl text-blue-600 rounded-full"><FaFacebook/></p>
            <p className="text-3xl text-red-800 rounded-full"><FaYoutube/></p>
        </div>



      </div>
    </div>
  );
};

export default Footer;
