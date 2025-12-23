import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "user",
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email && !loading, // wait until auth is ready
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/role?email=${user.email}`
      );
      return res.data.role;
    },
  });

  return {
    role,
    isLoading,
    refetch,
  };
};

export default useRole;
