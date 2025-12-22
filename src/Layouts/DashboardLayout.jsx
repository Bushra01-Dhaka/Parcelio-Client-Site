import { NavLink, Outlet } from "react-router";
import ParcelioLogo from "../Components/Home-Comonents/ParcelioLogo";
import { RxDashboard } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import {
  FaHistory,
  FaTruck,
  FaUserEdit,
  FaMotorcycle,
  FaUserClock,
} from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-start justify-start">
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
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
          <div className="mx-2 flex-1 px-2 font-bold text-secondary">
            Dashboard
          </div>
          <div className="hidden flex-none lg:block ">
            <ul className="menu menu-horizontal ">
              {/* Navbar menu content here */}
              <ParcelioLogo></ParcelioLogo>

              <li>
                <NavLink
                  to="/dashboard"
                  className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
                >
                  <RxDashboard className="text-lg" />
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/userParcels"
                  className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
                >
                  <TbTruckDelivery className="text-xl" />
                  My Parcel
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
                >
                  <FaHistory className="text-lg" />
                  Payment History
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/track"
                  className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
                >
                  <FaTruck className="text-lg" />
                  Track Your Parcel
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
                >
                  <FaUserEdit className="text-lg" />
                  Update Profile
                </NavLink>
              </li>

              {/* Rider Routes */}
              <li>
                <NavLink
                  to="/dashboard/activeRiders"
                  className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
                >
                  <FaMotorcycle className="text-lg" />
                  Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pendingRiders"
                  className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
                >
                  <FaUserClock className="text-lg" />
                  Pending Riders
                </NavLink>
              </li>

              {/* Admin Routes */}
              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
                >
                  <FaUserShield className="text-lg" />
                  Manage Admins
                </NavLink>
              </li>
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
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
            >
              <RxDashboard className="text-lg" />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/userParcels"
              className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
            >
              <TbTruckDelivery className="text-xl" />
              My Parcel
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
            >
              <FaHistory className="text-lg" />
              Payment History
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/track"
              className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
            >
              <FaTruck className="text-lg" />
              Track Your Parcel
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/profile"
              className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
            >
              <FaUserEdit className="text-lg" />
              Update Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/activeRiders"
              className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
            >
              <FaMotorcycle className="text-lg" />
              Active Riders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/pendingRiders"
              className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
            >
              <FaUserClock className="text-lg" />
              Pending Riders
            </NavLink>
          </li>

          {/* Admin Routes */}
          <li>
            <NavLink
              to="/dashboard/makeAdmin"
              className="flex items-center gap-3 text-secondary py-2 hover:bg-primary mb-4 mx-6 hover:font-bold"
            >
              <FaUserShield className="text-lg" />
              Manage Admins
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
