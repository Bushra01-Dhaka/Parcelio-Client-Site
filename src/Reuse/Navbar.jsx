import { Link, NavLink } from "react-router";
import ParcelioLogo from "../Components/Home-Comonents/ParcelioLogo";

const Navbar = () => {
  const navItem = (
    <>
      <li className="py-2 lg:py-0 text-2xl text-secondary font-semibold lg:text-[16px]">
        <NavLink to="/">Services</NavLink>
      </li>
      <li className="py-2 lg:py-0 text-2xl text-secondary font-semibold lg:text-[16px]">
        {" "}
        <NavLink to="">Coverage</NavLink>
      </li>
      <li className="py-2 lg:py-0 text-2xl text-secondary font-semibold lg:text-[16px]">
        {" "}
        <NavLink to="">About Us</NavLink>
      </li>
      <li className="py-2 lg:py-0 text-2xl text-secondary font-semibold lg:text-[16px]">
        <NavLink to="">Pricing</NavLink>
      </li>
      <li className="py-2 lg:py-0 text-2xl text-secondary font-semibold lg:text-[16px]">
        <NavLink to="">Be a Rider</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-fixed z-[99] navbar bg-base-100 shadow-lg py-4 md:max-w-screen-xl mx-auto rounded-xl px-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-primary text-secondary flex justify-center flex-col items-center rounded-box z-1 text-2xl mt-3 w-72 p-2 shadow  "
          >
            {navItem}
          </ul>
        </div>
          <Link>
             <ParcelioLogo/>
          </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[16px]">{navItem}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-sm lg:btn-md btn-secondary btn-outline text-secondary hover:text-primary rounded-2xl mr-2 ">Sign In</a>
        <a className="btn btn-sm lg:btn-md  btn-primary text-secondary rounded-2xl ">Be a Rider</a>
      </div>
    </div>
  );
};

export default Navbar;
