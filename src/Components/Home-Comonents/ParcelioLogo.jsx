import { Link } from "react-router";
import logo from "../../assets/logo.png";

const ParcelioLogo = () => {
  return (
    <Link to="/">
      <div className="flex justify-center items-end">
        <img src={logo} alt="" />
        <p className="text-2xl lg:text-3xl font-extrabold -ml-4">Parcelio</p>
      </div>
    </Link>
  );
};

export default ParcelioLogo;
