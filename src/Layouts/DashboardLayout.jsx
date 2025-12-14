import { NavLink, Outlet } from "react-router";
import ParcelioLogo from "../Components/Home-Comonents/ParcelioLogo";
import { TbTruckDelivery } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start justify-start">
          {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
         <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2 font-bold text-secondary">Dashboard</div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
           <ParcelioLogo></ParcelioLogo>
          <li><NavLink className="text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold" to="/dashboard">Home</NavLink></li>
          <li><NavLink className="text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold" to="/dashboard/userParcel">My Parcel</NavLink></li>
        </ul>
      </div>
    </div>
    {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>


      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
           <div className="text-start flex items-start p-4 mb-6">
             <ParcelioLogo></ParcelioLogo>
           </div>
          <li><NavLink className="text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold" to="/dashboard"><RxDashboard className="inline text-lg"/>Dashboard</NavLink></li>
          <li><NavLink className="text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold" to="/dashboard/userParcels"><TbTruckDelivery className="inline text-xl" />My Parcel</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
