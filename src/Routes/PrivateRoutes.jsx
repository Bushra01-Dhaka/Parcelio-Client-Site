
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth"


const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <div className="flex justify-center items-center min-h-[100vh]">
            <span className="loading loading-spinner text-6xl loading-xl"></span>
        </div>
    }

    if(!user){
        return <Navigate state={{from: location.pathname}} to="/login"></Navigate>
    }

  return children;
}

export default PrivateRoutes