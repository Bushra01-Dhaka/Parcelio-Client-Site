import { useQuery } from "@tanstack/react-query";
import {
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaUserShield,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TrackParcel from "../TrackParcel";

/* ================= STATUS META ================= */
const statusMeta = {
  delivered: {
    label: "Delivered",
    icon: <FaCheckCircle />,
    color: "#22c55e", // green
    bg: "bg-green-100 text-green-700",
  },
  not_collected: {
    label: "Not Collected",
    icon: <FaClock />,
    color: "#facc15", // yellow
    bg: "bg-yellow-100 text-yellow-700",
  },
  rider_assigned: {
    label: "Rider Assigned",
    icon: <FaTruck />,
    color: "#3b82f6", // blue
    bg: "bg-blue-100 text-blue-700",
  },
};

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  /* ================= LOAD DATA ================= */
  const { data = [], isLoading } = useQuery({
    queryKey: ["parcel-status-count"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels/delivery/status-count"
      );
      return res.data;
    },
  });

  const totalParcels = data.reduce(
    (sum, item) => sum + item.count,
    0
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ================= PIE CHART DATA ================= */
  const pieData = data.map((item) => ({
    name:
      statusMeta[item.status]?.label ||
      item.status.replace("_", " "),
    value: item.count,
    color: statusMeta[item.status]?.color || "#8884d8",
  }));

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <FaUserShield className="text-3xl text-primary" />
        <h2 className="text-3xl md:text-4xl font-bold">
          Admin Dashboard
        </h2>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Parcels */}
        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-figure text-primary text-3xl">
            <FaBoxOpen />
          </div>
          <div className="stat-title">Total Parcels</div>
          <div className="stat-value">{totalParcels}</div>
          <div className="stat-desc">All deliveries</div>
        </div>

        {/* Status Cards */}
        {data.map((item) => {
          const meta = statusMeta[item.status] || {};
          return (
            <div
              key={item.status}
              className="stat bg-base-100 shadow rounded-xl"
            >
              <div className="stat-figure text-3xl">
                {meta.icon}
              </div>
              <div className="stat-title">
                {meta.label || item.status}
              </div>
              <div className="stat-value">{item.count}</div>
              <div className="stat-desc capitalize">
                {item.status.replace("_", " ")}
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= PIE CHART SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-base-100 shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            📦 Delivery Status Distribution
          </h3>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-base-100 shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            🚚 Status Overview
          </h3>

          <div className="space-y-4">
            {data.map((item) => {
              const meta = statusMeta[item.status] || {};
              return (
                <div
                  key={item.status}
                  className={`flex justify-between items-center p-4 rounded-lg ${meta.bg}`}
                >
                  <div>
                    <p className="font-semibold">
                      {meta.label || item.status}
                    </p>
                    <p className="text-sm capitalize">
                      {item.status.replace("_", " ")}
                    </p>
                  </div>
                  <div className="text-2xl font-bold">
                    {item.count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= ADMIN INSIGHTS ================= */}
      <div className="bg-base-100 shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">
          📊 Admin Insights
        </h3>
        <ul className="space-y-2 text-sm">
          <li>• Visual overview of delivery progress</li>
          <li>• Quickly identify bottlenecks</li>
          <li>• Monitor rider workload</li>
          <li>• Improve delivery efficiency</li>
        </ul>
      </div>

      <br />
      <br />
      <TrackParcel/>
    </div>
  );
};

export default AdminDashboard;
