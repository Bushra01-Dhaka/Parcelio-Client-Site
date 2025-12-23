import { Navigate } from "react-router";
import useAuth from "../Hooks/useAuth"
import useRole from "../Hooks/useRole";
import { Children } from "react";


const AdminRoutes = ({children}) => {
    const { user, loading} = useAuth();
    const {role, isLoading} = useRole();

    if(loading || isLoading){
         return <div className="flex justify-center items-center min-h-[100vh]">
            <span className="loading loading-spinner text-6xl loading-xl"></span>
        </div>
    }

    if(!user || role !== "admin"){
        return  <Navigate state={{from: location.pathname}} to="/forbiddenPage"></Navigate>
    }

  return children;
}

export default AdminRoutes