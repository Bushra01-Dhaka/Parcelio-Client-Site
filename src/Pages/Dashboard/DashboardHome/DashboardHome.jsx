import Loading from "../../../Components/Loading/Loading";
import useRole from "../../../Hooks/useRole"
import ForbiddenPage from "../../ForbiddenPage/ForbiddenPage";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";


const DashboardHome = () => {
  const {role,  isLoading} = useRole();

  if(isLoading){
    return <Loading></Loading>
  }

  if(role === "user"){
    return <UserDashboard></UserDashboard>
  }

  if(role === "rider"){
    return <RiderDashboard></RiderDashboard>
  }

  if(role === "admin"){
    return <AdminDashboard></AdminDashboard>
  }

  else{
    return <ForbiddenPage></ForbiddenPage>
  }
}

export default DashboardHome