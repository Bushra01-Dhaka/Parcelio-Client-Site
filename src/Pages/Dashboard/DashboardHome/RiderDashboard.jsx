
import { useQuery } from "@tanstack/react-query";

import {
  FaTruck,
  FaBoxOpen,
  FaMoneyBillWave,
  FaMapMarkedAlt,
} from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MyEarnings from "../MyEarnings/MyEarnings";
import StatCard from "../../../Components/Cards/StatCard";
import ActionCard from "../../../Components/Cards/ActionCard";

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 🔹 Load rider delivery stats
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["rider-dashboard-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/dashboard/stats?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* 🔹 Welcome */}
      <div className="bg-base-100 shadow rounded-xl p-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Welcome, {user?.displayName || "Rider"} 🚴‍♂️
        </h2>
        <p className="text-gray-500 mt-1">
          Here’s your delivery & earning overview
        </p>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Parcels"
          value={stats.assigned || 0}
          icon={<FaBoxOpen />}
          color="bg-info"
        />
        <StatCard
          title="In Transit"
          value={stats.inTransit || 0}
          icon={<FaTruck />}
          color="bg-warning"
        />
        <StatCard
          title="Delivered"
          value={stats.delivered || 0}
          icon={<FaMapMarkedAlt />}
          color="bg-success"
        />
        <StatCard
          title="Total Earnings"
          value={`৳ ${stats.totalEarning || 0}`}
          icon={<FaMoneyBillWave />}
          color="bg-primary"
        />
      </div>

      {/* 🔹 Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionCard
          title="My Assigned Parcels"
          desc="View & manage assigned deliveries"
          link="/dashboard/rider/parcels"
        />
        <ActionCard
          title="Delivery History"
          desc="View completed deliveries"
          link="/dashboard/rider/history"
        />
        <ActionCard
          title="Cashout Requests"
          desc="Track payout status"
          link="/dashboard/rider/cashout"
        />
      </div>

      {/* 🔹 Earnings Section */}
      <MyEarnings />
    </div>
  );
};

export default RiderDashboard;
