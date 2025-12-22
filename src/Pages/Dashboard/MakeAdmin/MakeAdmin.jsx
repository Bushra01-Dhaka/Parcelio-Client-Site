import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    const res = await axiosSecure.get(`/users/search?q=${query}`);
    setUsers(res.data);
    setLoading(false);
  };

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Make Admin?",
      text: "This user will have admin privileges",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/users/make-admin/${id}`);
        Swal.fire("Success", "User is now admin", "success");
        handleSearch();
      }
    });
  };

  const handleRemoveAdmin = (id) => {
    Swal.fire({
      title: "Remove Admin?",
      text: "This user will lose admin privileges",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/users/remove-admin/${id}`);
        Swal.fire("Success", "Admin role removed", "success");
        handleSearch();
      }
    });
  };

  return (
    <div className="p-6 max-w-5xl lg:w-[70%]">
      <h2 className="text-3xl lg:text-4xl  font-bold my-6">Manage Admins</h2>

      {/* SEARCH */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by email or name"
          className="input input-bordered w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn text-secondary btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* TABLE */}
      {loading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin" ? "badge-success" : "badge-ghost"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="text-center">
                    {user.role === "admin" ? (
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleRemoveAdmin(user._id)}
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleMakeAdmin(user._id)}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && users.length === 0 && query && (
        <p className="text-center text-gray-500 mt-10">No users found</p>
      )}
    </div>
  );
};

export default MakeAdmin;
