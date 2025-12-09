import logo from "../../assets/logo.png"

const ParcelioLogo = () => {
  return (
    <div className="flex justify-center items-end">
         <img src={logo} alt="" />
         <p className="text-2xl lg:text-3xl font-extrabold -ml-4">Parcelio</p>
    </div>
  )
}

export default ParcelioLogo