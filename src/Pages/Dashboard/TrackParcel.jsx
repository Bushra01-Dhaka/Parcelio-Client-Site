import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UpdateTracking from "./UpdateTracking/UpdateTracking";

const TrackParcel = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [inputId, setInputId] = useState(trackingId || "");
  const [parcel, setParcel] = useState(null);
  const [updates, setUpdates] = useState([]);

  const fetchTracking = async (id) => {
    try {
      const parcelRes = await axiosSecure.get(`/parcel-by-tracking/${id}`);
      const trackingRes = await axiosSecure.get(`/tracking/${id}`);

      setParcel(parcelRes.data);
      setUpdates(trackingRes.data);
    } catch {
      Swal.fire("Invalid Tracking ID", "Please check and try again", "error");
      setParcel(null);
      setUpdates([]);
    }
  };

  useEffect(() => {
    if (trackingId) {
      fetchTracking(trackingId);
    }
  }, [trackingId]);

  const handleSearch = () => {
    if (!inputId) return;
    navigate(`/track/${inputId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        📦 Track Your Parcel
      </h2>

      {/* Search Box */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Enter Tracking ID"
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Track
        </button>
      </div>

      {/* Parcel Summary */}
      {parcel && (
        <div className="card bg-base-100 shadow p-4 mb-6">
          <h3 className="font-semibold text-lg mb-2">Parcel Info</h3>
          <p>
            <strong>Tracking ID:</strong> {parcel.tracking_id}
          </p>
          <p>
            <strong>Status:</strong> {parcel.delivery_status}
          </p>
          <p>
            <strong>Payment:</strong> {parcel.payment_status}
          </p>
        </div>
      )}

      {/* Tracking Timeline */}
      {updates.length > 0 && (
        <ul className="timeline timeline-vertical">
          {updates.map((u, index) => (
            <li key={index}>
              <div className="timeline-start text-sm">
                {new Date(u.createdAt).toLocaleString()}
              </div>

              <div className="timeline-middle">🚚</div>

              <div className="timeline-end timeline-box">
                <p className="font-semibold capitalize">
                  {u.step.replace("_", " ")}
                </p>
                <p className="text-sm text-gray-500">{u.location}</p>
                <p className="text-xs">{u.message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <br />
      <br />
      {/* <UpdateTracking/> */}
    </div>
  );
};

export default TrackParcel;
