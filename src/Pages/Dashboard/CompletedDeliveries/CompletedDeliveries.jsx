import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completed-deliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/parcels/completed?email=${user.email}&delivery_status=delivered`
      );
      return res.data;
    },
  });

  // ================= EARNING CALCULATION =================
  const calculateEarning = (parcel) => {
    const isSameDistrict = parcel.senderCenter === parcel.receiverCenter;

    return isSameDistrict ? parcel.cost * 0.8 : parcel.cost * 0.3;
  };

  const totalEarning = parcels.reduce(
    (sum, parcel) => sum + calculateEarning(parcel),
    0
  );

  const handleCashout = async (parcel) => {
  const earning = calculateEarning(parcel);

  const confirm = await Swal.fire({
    title: "Confirm Cashout",
    html: `
      <p><b>Tracking ID:</b> ${parcel.tracking_id}</p>
      <p><b>Earning:</b> ৳${earning.toFixed(2)}</p>
      <p class="text-sm text-gray-500 mt-2">
        This action cannot be undone
      </p>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Cashout",
  });

  if (!confirm.isConfirmed) return;

  const res = await axiosSecure.patch(
    `/parcels/${parcel._id}/cashout`
  );

  if (res.data.modifiedCount) {
    Swal.fire("Success!", "Cashout completed", "success");
    refetch();
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
      <h2 className="text-2xl md:text-4xl font-bold mb-6">
        Completed Deliveries
      </h2>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-5 bg-base-100 shadow rounded-xl">
          <p className="text-sm text-gray-500">Total Deliveries</p>
          <p className="text-3xl font-bold">{parcels.length}</p>
        </div>

        <div className="p-5 bg-base-100 shadow rounded-xl">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-3xl font-bold text-success">
            ৳{totalEarning.toFixed(2)}
          </p>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Route</th>
              <th>Cost</th>
              <th>Delivery Type</th>
              <th>Delivered At</th>
              <th>Earning</th>
              <th>Cashout</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => {
              const isSameDistrict =
                parcel.senderCenter === parcel.receiverCenter;

              const earning = calculateEarning(parcel);

              return (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>

                  <td className="font-semibold">{parcel.tracking_id}</td>

                  <td>
                    <p className="font-medium">
                      {parcel.senderCenter} → {parcel.receiverCenter}
                    </p>
                  </td>

                  <td>৳{parcel.cost}</td>

                  <td>
                    <span
                      className={`badge font-bold ${
                        isSameDistrict ? "badge-success" : "badge-info"
                      }`}
                    >
                      {isSameDistrict ? "Same District" : "Inter District"}
                    </span>
                  </td>

                  <td className="text-sm text-gray-600">
                    {parcel.paidAt
                      ? new Date(parcel.paidAt).toLocaleString()
                      : "N/A"}
                  </td>

                  <td className="font-bold text-success">
                    ৳{earning.toFixed(2)}
                  </td>

                  <td>
                    {parcel.riderCashoutStatus === "paid" ? (
                      <span className="badge text-secondary font-bold badge-success">Paid</span>
                    ) : (
                      <button
                        className="btn text-secondary font-bold btn-xs btn-warning"
                        onClick={() => handleCashout(parcel)}
                      >
                        Cashout
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No completed deliveries yet
          </p>
        )}
      </div>
    </div>
  );
};

export default CompletedDeliveries;
