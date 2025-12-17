import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";

const useUpdateTracking = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Update tracking history + parcel status
   */
  const updateTracking = async ({
    trackingId,
    status,
    location,
    note = "",
    updateParcelStatus = true,
  }) => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Insert tracking history
      await axiosSecure.post("/tracking", {
        tracking_id: trackingId,
        status,
        location,
        note,
      });

      // 2️⃣ Update parcel delivery status (optional)
      if (updateParcelStatus) {
        await axiosSecure.patch(`/parcels/tracking-status/${trackingId}`, {
          delivery_status: status,
        });
      }

      Swal.fire({
        icon: "success",
        title: "Tracking Updated",
        text: `Status set to "${status}"`,
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to update tracking");

      Swal.fire("Error", "Could not update tracking", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    updateTracking,
    loading,
    error,
  };
};

export default useUpdateTracking;
