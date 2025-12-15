import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const ParcelDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const { data: parcel = [], isLoading } = useQuery({
    queryKey: ["parcel-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      console.log("Details: ",res.data)
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
    <div className="min-h-screen p-4 md:p-8 lg:w-screen-xl mx-auto">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-xl p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Parcel Details
            </h2>
            <p className="text-sm text-gray-500">
              Tracking ID: <span className="font-semibold">{parcel.tracking_id}</span>
            </p>
          </div>

          <span
            className={`badge badge-lg text-secondary font-semibold mt-3 md:mt-0 ${
              parcel.payment_status === "paid"
                ? "badge-success"
                : "badge-warning"
            }`}
          >
            {parcel.payment_status}
          </span>
        </div>

        {/* ================= BASIC INFO ================= */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="stats shadow bg-primary">
            <div className="stat">
              <div className="stat-title">Parcel Type</div>
              <div className="stat-value capitalize text-lg">
                {parcel.parcelType}
              </div>
            </div>
          </div>

          <div className="stats shadow bg-primary">
            <div className="stat">
              <div className="stat-title">Delivery Status</div>
              <div className="stat-value text-lg capitalize">
                {parcel.delivery_status?.replace("_", " ") || "N/A"}
              </div>
            </div>
          </div>

          <div className="stats shadow bg-primary">
            <div className="stat">
              <div className="stat-title">Total Cost</div>
              <div className="stat-value text-lg">৳{parcel.cost}</div>
            </div>
          </div>
        </div>

        {/* ================= PARCEL INFO ================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-xl p-4">
            <h3 className="font-bold mb-3">Parcel Info</h3>
            <p><strong>Title:</strong> {parcel.title}</p>
            <p><strong>Created At:</strong> {new Date(parcel.creation_date).toLocaleString()}</p>
          </div>

          <div className="border rounded-xl p-4">
            <h3 className="font-bold mb-3">Payment Info</h3>
            <p><strong>Status:</strong> {parcel.payment_status}</p>
            <p><strong>Amount:</strong> ৳{parcel.cost}</p>
          </div>
        </div>

        {/* ================= SENDER & RECEIVER ================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* Sender */}
          <div className="border rounded-xl p-4">
            <h3 className="font-bold mb-3">Sender Information</h3>
            <p><strong>Name:</strong> {parcel.senderName}</p>
            <p><strong>Contact:</strong> {parcel.senderContact}</p>
            <p><strong>Region:</strong> {parcel.senderRegion}</p>
            <p><strong>Service Center:</strong> {parcel.senderCenter}</p>
            <p><strong>Address:</strong> {parcel.senderAddress}</p>
            <p className="text-sm text-gray-500 mt-2">
              Pickup Instruction: {parcel.pickupInstruction}
            </p>
          </div>

          {/* Receiver */}
          <div className="border rounded-xl p-4">
            <h3 className="font-bold mb-3">Receiver Information</h3>
            <p><strong>Name:</strong> {parcel.receiverName}</p>
            <p><strong>Contact:</strong> {parcel.receiverContact}</p>
            <p><strong>Region:</strong> {parcel.receiverRegion}</p>
            <p><strong>Service Center:</strong> {parcel.receiverCenter}</p>
            <p><strong>Address:</strong> {parcel.receiverAddress}</p>
            <p className="text-sm text-gray-500 mt-2">
              Delivery Instruction: {parcel.deliveryInstruction}
            </p>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          {parcel.payment_status === "unpaid" && (
            <Link
              to={`/payment/${parcel._id}`}
              className="btn text-secondary bg-primary font-bold"
            >
              Proceed to Payment
            </Link>
          )}

          <Link to="/dashboard/my-parcels" className="btn btn-secondary text-primary font-bold">
            Back to Parcels
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ParcelDetails;
