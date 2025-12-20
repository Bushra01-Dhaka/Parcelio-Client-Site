import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  /* ================= APPROVE ================= */
  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve Rider?",
      text: "This rider will become active",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/riders/approve/${id}`);
        Swal.fire("Approved!", "Rider is now active", "success");
        refetch();
      }
    });
  };

  /* ================= REJECT ================= */
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Rider?",
      text: "This application will be removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/riders/reject/${id}`);
        Swal.fire("Rejected!", "Application removed", "success");
        refetch();
      }
    });
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
      <h2 className="text-2xl md:text-4xl font-bold mb-6">
        Pending Rider Applications
      </h2>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Bike</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>
                  {rider.region}, {rider.district}
                </td>
                <td>{rider.bikeBrand}</td>
                <td className="flex gap-2 justify-center flex-wrap">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setSelectedRider(rider)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleApprove(rider._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleReject(rider._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {riders.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No pending rider applications
          </p>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedRider && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">
              Rider Details
            </h3>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
              <p><strong>Bike Reg No:</strong> {selectedRider.bikeRegistration}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="badge badge-warning">
                  {selectedRider.status}
                </span>
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setSelectedRider(null)}
              >
                Close
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  handleApprove(selectedRider._id);
                  setSelectedRider(null);
                }}
              >
                Approve
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  handleReject(selectedRider._id);
                  setSelectedRider(null);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
