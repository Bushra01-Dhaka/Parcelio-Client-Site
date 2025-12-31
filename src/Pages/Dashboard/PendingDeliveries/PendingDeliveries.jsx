import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import useTracking from "../../../Hooks/useTracking";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { addTracking } = useTracking();

  const [selectedParcel, setSelectedParcel] = useState(null);

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rider-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/parcels?email=${user?.email}`
      );
      return res.data;
    },
  });

  // ================= UPDATE STATUS + TRACKING =================
  const updateStatus = async (parcel, status) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Mark parcel as ${status.replace("_", " ")}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(
      `/parcels/${parcel._id}/status`,
      { status }
    );

    if (res.data.modifiedCount) {

      // 🔹 TRACKING WHEN PARCEL IS PICKED UP
      if (status === "in_transit") {
        await addTracking({
          tracking_id: parcel.tracking_id,
          step: "parcel_picked_up",
          message: "Rider has picked up the parcel",
          location: parcel.senderCenter,
          updated_by: user?.email,
        });
      }

      // 🔹 TRACKING WHEN PARCEL IS DELIVERED
      if (status === "delivered") {
        await addTracking({
          tracking_id: parcel.tracking_id,
          step: "parcel_delivered",
          message: "Parcel has been delivered successfully",
          location: parcel.receiverCenter,
          updated_by: user?.email,
        });
      }

      Swal.fire("Success!", "Status updated successfully", "success");
      refetch();
    }
  };

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl md:text-4xl font-bold mb-6">
        Pending Deliveries
      </h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Destination</th>
              <th>Status</th>
              <th className="text-center">Action</th>
              <th className="text-center">Details</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>

                <td className="font-semibold">
                  {parcel.tracking_id}
                </td>

                <td>
                  <p className="font-medium">{parcel.senderName}</p>
                  <p className="text-xs text-gray-500">
                    {parcel.senderContact}
                  </p>
                </td>

                <td>
                  <p className="font-medium">{parcel.receiverName}</p>
                  <p className="text-xs text-gray-500">
                    {parcel.receiverContact}
                  </p>
                </td>

                <td>
                  {parcel.receiverCenter}
                  <br />
                  <span className="text-xs text-gray-500">
                    {parcel.receiverRegion}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge font-bold ${
                      parcel.delivery_status === "rider_assigned"
                        ? "badge-warning"
                        : parcel.delivery_status === "in_transit"
                        ? "badge-info"
                        : "badge-success"
                    }`}
                  >
                    {parcel.delivery_status}
                  </span>
                </td>

                <td className="text-center">
                  {parcel.delivery_status === "rider_assigned" && (
                    <button
                      onClick={() =>
                        updateStatus(parcel, "in_transit")
                      }
                      className="btn text-secondary font-bold btn-xs btn-primary"
                    >
                      Picked Up
                    </button>
                  )}

                  {parcel.delivery_status === "in_transit" && (
                    <button
                      onClick={() =>
                        updateStatus(parcel, "delivered")
                      }
                      className="btn text-secondary font-bold btn-xs btn-success"
                    >
                      Delivered
                    </button>
                  )}
                </td>

                <td className="text-center">
                  <button
                    onClick={() => setSelectedParcel(parcel)}
                    className="btn btn-xs btn-outline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No pending deliveries
          </p>
        )}
      </div>

      {/* ================= DETAILS MODAL ================= */}
      {selectedParcel && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">
              Parcel Details
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Tracking ID:</strong>{" "}
                {selectedParcel.tracking_id}
              </p>
              <p>
                <strong>Title:</strong> {selectedParcel.title}
              </p>
              <p>
                <strong>Type:</strong> {selectedParcel.parcelType}
              </p>
              <p>
                <strong>Cost:</strong> ৳{selectedParcel.cost}
              </p>

              <hr />

              <p>
                <strong>Sender:</strong>{" "}
                {selectedParcel.senderName}
              </p>
              <p>
                <strong>Sender Phone:</strong>{" "}
                {selectedParcel.senderContact}
              </p>
              <p>
                <strong>Pickup Address:</strong>{" "}
                {selectedParcel.senderAddress}
              </p>
              <p>
                <strong>Pickup Instruction:</strong>{" "}
                {selectedParcel.pickupInstruction}
              </p>

              <hr />

              <p>
                <strong>Receiver:</strong>{" "}
                {selectedParcel.receiverName}
              </p>
              <p>
                <strong>Receiver Phone:</strong>{" "}
                {selectedParcel.receiverContact}
              </p>
              <p>
                <strong>Delivery Address:</strong>{" "}
                {selectedParcel.receiverAddress}
              </p>
              <p>
                <strong>Delivery Instruction:</strong>{" "}
                {selectedParcel.deliveryInstruction}
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedParcel(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingDeliveries;
