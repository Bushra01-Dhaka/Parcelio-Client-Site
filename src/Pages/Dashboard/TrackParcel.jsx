import { useState } from "react";
import { format } from "date-fns";
import useAxios from "../../Hooks/useAxios";

const TrackParcel = () => {
  const axiosPublic = useAxios();

  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!trackingId) return;

    setLoading(true);
    setError("");
    setTrackingData([]);

    try {
      const res = await axiosPublic.get(
        `/tracking/${trackingId}`
      );
      setTrackingData(res.data);
    } catch (err) {
      setError("No tracking information found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 rounded-xl shadow p-6">

        <h2 className="text-3xl font-bold text-center mb-6">
          Track Your Parcel
        </h2>

        {/* ================= SEARCH BOX ================= */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            onClick={handleTrack}
            className="btn btn-primary text-secondary font-bold"
          >
            Track
          </button>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="flex justify-center py-6">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* ================= ERROR ================= */}
        {error && (
          <p className="text-center text-error font-medium">
            {error}
          </p>
        )}

        {/* ================= TIMELINE ================= */}
        {trackingData.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">
              Tracking Timeline
            </h3>

            <ul className="timeline timeline-vertical">
              {trackingData.map((track, index) => (
                <li key={track._id}>
                  <div className="timeline-start text-xs opacity-70">
                    {format(
                      new Date(track.createdAt),
                      "dd MMM yyyy, hh:mm a"
                    )}
                  </div>

                  <div className="timeline-middle">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>

                  <div className="timeline-end mb-6">
                    <p className="font-semibold capitalize">
                      {track.step.replace("_", " ")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {track.message}
                    </p>
                    {track.location && (
                      <p className="text-xs text-gray-400">
                        📍 {track.location}
                      </p>
                    )}
                  </div>

                  {index < trackingData.length - 1 && <hr />}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackParcel;
