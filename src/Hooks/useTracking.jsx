import useAxiosSecure from "./useAxiosSecure";


const useTracking = () => {
  const axiosSecure = useAxiosSecure();

  const addTracking = async ({
    tracking_id,
    step,
    message,
    location,
    updated_by,
  }) => {
    return axiosSecure.post("/tracking", {
      tracking_id,
      step,
      message,
      location,
      updated_by,
    });
  };

  return { addTracking };
};

export default useTracking;
