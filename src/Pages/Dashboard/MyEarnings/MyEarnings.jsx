import { useMemo, useState } from "react";
import {
  isToday,
  isThisWeek,
  isThisMonth,
  isThisYear,
} from "date-fns";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [filter, setFilter] = useState("overall");

  // 🔹 Load completed parcels of rider
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["rider-earnings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/parcels/completed?email=${user.email}&status=delivered`
      );
      return res.data;
    },
  });

  // 🔹 Calculate earning per parcel
  const calculateEarning = (parcel) => {
    const isSameDistrict =
      parcel.senderCenter === parcel.receiverCenter;

    return isSameDistrict
      ? parcel.cost * 0.8
      : parcel.cost * 0.3;
  };

  // 🔹 Filter parcels by date (using updatedAt)
  const filteredParcels = useMemo(() => {
    return parcels.filter((parcel) => {
      if (!parcel.updatedAt) return false;

      const date = new Date(parcel.updatedAt);

      if (filter === "today") return isToday(date);
      if (filter === "week") return isThisWeek(date);
      if (filter === "month") return isThisMonth(date);
      if (filter === "year") return isThisYear(date);

      return true; // overall
    });
  }, [filter, parcels]);

  // 🔹 Earnings summary (FIXED CASHOUT LOGIC)
  const summary = useMemo(() => {
    let total = 0;
    let cashedOut = 0;

    filteredParcels.forEach((parcel) => {
      const earning = calculateEarning(parcel);
      total += earning;

      // ✅ FIX: use riderCashoutStatus
      if (parcel.riderCashoutStatus === "paid") {
        cashedOut += earning;
      }
    });

    return {
      total,
      cashedOut,
      pending: total - cashedOut,
    };
  }, [filteredParcels]);

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
        My Earnings
      </h2>

      {/* 🔹 Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["today", "week", "month", "year", "overall"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`btn btn-sm ${
                filter === type
                  ? "btn-primary text-secondary"
                  : "btn-outline"
              }`}
            >
              {type.toUpperCase()}
            </button>
          )
        )}
      </div>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-base-100 shadow rounded-xl p-4">
          <p className="text-gray-500">Total Earned</p>
          <h3 className="text-2xl font-bold">
            ৳ {summary.total.toFixed(2)}
          </h3>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-4">
          <p className="text-gray-500">Cashed Out</p>
          <h3 className="text-2xl font-bold text-green-600">
            ৳ {summary.cashedOut.toFixed(2)}
          </h3>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-4">
          <p className="text-gray-500">Pending</p>
          <h3 className="text-2xl font-bold text-orange-500">
            ৳ {summary.pending.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* 🔹 Earnings Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Route</th>
              <th>Fee</th>
              <th>Earning</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredParcels.map((parcel, index) => {
              const earning = calculateEarning(parcel);

              return (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.tracking_id}</td>
                  <td>
                    {parcel.senderCenter} →{" "}
                    {parcel.receiverCenter}
                  </td>
                  <td>৳ {parcel.cost}</td>
                  <td className="font-bold">
                    ৳ {earning.toFixed(2)}
                  </td>

                  {/* ✅ FIXED BADGE */}
                  <td>
                    <span
                      className={`badge text-secondary font-bold ${
                        parcel.riderCashoutStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {parcel.riderCashoutStatus === "paid"
                        ? "Cashed Out"
                        : "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredParcels.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No earnings found
          </p>
        )}
      </div>
    </div>
  );
};

export default MyEarnings;
