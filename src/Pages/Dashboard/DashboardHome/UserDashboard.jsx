import { FaBoxOpen, FaClock, FaCheckCircle, FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 🔹 Load user's parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["user-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  // 🔹 Parcel stats
  const stats = {
    total: parcels.length,
    pending: parcels.filter(
      (p) =>
        p.delivery_status !== "delivered"
    ).length,
    delivered: parcels.filter(
      (p) =>
        p.delivery_status === "delivered"
    ).length,
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8">
      {/* 🔹 Header */}
      <h2 className="text-2xl md:text-4xl font-bold mb-2">
        Welcome, {user?.displayName || "User"} 👋
      </h2>
      <p className="text-gray-500 mb-6">
        Track your parcels and create new deliveries easily
      </p>

      {/* 🔹 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-base-100 shadow rounded-xl p-4 flex gap-4 items-center">
          <FaBoxOpen className="text-3xl text-primary" />
          <div>
            <p className="text-gray-500">Total Parcels</p>
            <h3 className="text-2xl font-bold">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-4 flex gap-4 items-center">
          <FaClock className="text-3xl text-warning" />
          <div>
            <p className="text-gray-500">Pending</p>
            <h3 className="text-2xl font-bold">{stats.pending}</h3>
          </div>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-4 flex gap-4 items-center">
          <FaCheckCircle className="text-3xl text-success" />
          <div>
            <p className="text-gray-500">Delivered</p>
            <h3 className="text-2xl font-bold">{stats.delivered}</h3>
          </div>
        </div>
      </div>

      {/* 🔹 Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/sendParcel"
          className="bg-primary text-secondary rounded-xl p-6 flex items-center gap-4 hover:opacity-90"
        >
          <FaPlus className="text-2xl" />
          <div>
            <h3 className="text-xl font-bold">
              Create New Parcel
            </h3>
            <p>Send a new parcel</p>
          </div>
        </Link>

        <Link
          to="/dashboard/my-parcels"
          className="bg-base-100 shadow rounded-xl p-6 hover:shadow-lg"
        >
          <h3 className="text-xl font-bold">
            View My Parcels
          </h3>
          <p className="text-gray-500">
            Track and manage your parcels
          </p>
        </Link>
      </div>

      {/* 🔹 Recent Parcels */}
      <div className="bg-base-100 shadow rounded-xl overflow-x-auto">
        <div className="p-4 border-b font-semibold">
          Recent Parcels
        </div>

        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Receiver</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {parcels.slice(0, 5).map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">
                  {parcel.tracking_id}
                </td>
                <td>{parcel.receiverName}</td>
                <td>
                  <span
                    className={`badge font-bold ${
                      parcel.delivery_status === "delivered"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {parcel.delivery_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No parcels found
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
