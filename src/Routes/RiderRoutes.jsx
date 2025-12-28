import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";


const RiderRoutes = ({children}) => {
 const { user, loading} = useAuth();
    const {role, isLoading} = useRole();

    if(loading || isLoading){
         return <div className="flex justify-center items-center min-h-[100vh]">
            <span className="loading loading-spinner text-6xl loading-xl"></span>
        </div>
    }

    if(!user || role !== "rider"){
        return  <Navigate state={{from: location.pathname}} to="/forbiddenPage"></Navigate>
    }

  return children;
}

export default RiderRoutes