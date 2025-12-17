import { useState } from "react";
import useUpdateTracking from "../../../Hooks/useUpdateTracking";

const UpdateTracking = () => {
  const { updateTracking, loading } = useUpdateTracking();

  const [form, setForm] = useState({
    trackingId: "",
    status: "In Transit",
    location: "",
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTracking({
      trackingId: form.trackingId,
      status: form.status,
      location: form.location,
      note: form.note,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 p-6 max-w-md mx-auto shadow"
    >
      <h3 className="text-xl font-bold mb-4">Update Tracking</h3>

      <input
        className="input input-bordered mb-3"
        placeholder="Tracking ID"
        onChange={(e) =>
          setForm({ ...form, trackingId: e.target.value })
        }
      />

      <select
        className="select select-bordered mb-3"
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option>Parcel Collected</option>
        <option>In Transit</option>
        <option>Arrived at Hub</option>
        <option>Out for Delivery</option>
        <option>Delivered</option>
      </select>

      <input
        className="input input-bordered mb-3"
        placeholder="Current Location"
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      />

      <textarea
        className="textarea textarea-bordered mb-3"
        placeholder="Optional note"
        onChange={(e) =>
          setForm({ ...form, note: e.target.value })
        }
      />

      <button className="btn btn-primary" disabled={loading}>
        {loading ? "Updating..." : "Update Tracking"}
      </button>
    </form>
  );
};

export default UpdateTracking;
