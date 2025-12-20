import React from 'react'

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  /* ================= LOAD ACTIVE RIDERS ================= */
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders?status=approved");
      return res.data;
    },
  });

  /* ================= DEACTIVATE ================= */
  const handleDeactivate = (id) => {
    Swal.fire({
      title: "Deactivate Rider?",
      text: "This rider will no longer receive deliveries",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Deactivate",
      confirmButtonColor: "#ef4444",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/riders/deactivate/${id}`);
        Swal.fire("Deactivated!", "Rider has been deactivated", "success");
        refetch();
      }
    });
  };

  /* ================= SEARCH FILTER ================= */
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Active Riders
        </h2>

        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>
                  {rider.region}, {rider.district}
                </td>
                <td>{rider.bikeBrand}</td>
                <td>
                  <span className="badge badge-success">
                    Active
                  </span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDeactivate(rider._id)}
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRiders.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No active riders found
          </p>
        )}
      </div>
    </div>
  );
};

export default ActiveRiders;
