import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();

  const [selectedParcel, setSelectedParcel] = useState(null);

  /* ================= LOAD PARCELS ================= */
  const {
    data: parcels = [],
    isLoading,
    refetch: refetchParcels,
  } = useQuery({
    queryKey: ["assignable-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      return res.data;
    },
  });

  /* ================= LOAD RIDERS (DYNAMIC) ================= */
  const {
    data: riders = [],
    isLoading: ridersLoading,
  } = useQuery({
    queryKey: ["riders", selectedParcel?.receiverCenter],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderCenter}`
      );
      return res.data;
    },
  });

  /* ================= OPEN MODAL ================= */
  const openAssignModal = (parcel) => {
    setSelectedParcel(parcel);
    modalRef.current.showModal();
  };

  /* ================= ASSIGN RIDER ================= */
  const handleAssignRider = async (rider) => {
    const assignInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
    };

    const res = await axiosSecure.patch(
      `/parcels/${selectedParcel._id}`,
      assignInfo
    );

    if (res.data.modifiedCount) {
      Swal.fire({
        icon: "success",
        title: "Rider Assigned",
        text: `${rider.name} assigned successfully`,
        timer: 1500,
        showConfirmButton: false,
      });

      modalRef.current.close();
      setSelectedParcel(null);
      refetchParcels();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
        Assign Rider
      </h2>

      {/* ================= PARCEL TABLE ================= */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Destination</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{parcel.tracking_id}</td>

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
                  {parcel.receiverRegion}
                  <br />
                  <span className="text-xs text-gray-500">
                    {parcel.receiverCenter}
                  </span>
                </td>

                <td>৳{parcel.cost}</td>

                <td>
                  <button
                    onClick={() => openAssignModal(parcel)}
                    className="btn btn-xs btn-primary text-secondary font-bold"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No parcels available
          </p>
        )}
      </div>

      {/* ================= MODAL ================= */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Riders in {selectedParcel?.receiverCenter}
          </h3>

          {ridersLoading ? (
            <div className="flex justify-center py-6">
              <span className="loading loading-spinner"></span>
            </div>
          ) : riders.length === 0 ? (
            <p className="text-center text-gray-500">
              No available riders in this district
            </p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {riders.map((rider) => (
                <div
                  key={rider._id}
                  className="flex justify-between items-center border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{rider.name}</p>
                    <p className="text-xs text-gray-500">
                      {rider.phone}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAssignRider(rider)}
                    className="btn btn-xs btn-success"
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedParcel(null)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
