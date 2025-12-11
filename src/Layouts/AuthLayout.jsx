import { Outlet, ScrollRestoration } from "react-router";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className=" bg-base-400  pt-6 lg:px-20">
      <div className="flex justify-center gap-6 items-center flex-col  lg:flex-row lg:px-10">
        <div
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-duration="2000"
          className="flex-1 "
        >
          <Outlet />
        </div>

        <img
          data-aos="zoom-in-left"
          data-aos-delay="150"
          data-aos-duration="1000"
          src={authImg}
          className="flex-1 "
        />
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AuthLayout;
