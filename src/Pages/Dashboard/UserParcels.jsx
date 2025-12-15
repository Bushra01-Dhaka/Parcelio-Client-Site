import { useQuery } from "@tanstack/react-query"
import useAuth from "../../Hooks/useAuth"
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";


const UserParcels = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data : parcels=[],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['my-parcel', user?.email],
    queryFn: async() => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    }
  })

  console.log(parcels);

  
  const handleDelete = (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Tracking ID: ${parcel.tracking_id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/parcels/${parcel._id}`)
        .then(res => {
          if(res.data.deletedCount){
               Swal.fire("Deleted!", "Parcel has been deleted.", "success");
          }
        })
        refetch();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  return (
     <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-4xl py-6 text-secondary font-bold mb-6">
        Total Parcels <span className="bg-primary font-bold text-secondary py-1 rounded-md px-4">{parcels.length}</span>
      </h2>

      {/* ================= TABLE VIEW (MD+) ================= */}
      <div className="hidden md:block overflow-x-auto bg-base-100 rounded-xl shadow-lg">
        <table className="table lg:w-[900px] table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Title</th>
              <th>Created</th>
              <th>Cost</th>
              <th>Payment</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className="capitalize">{parcel.parcelType}</td>
                <td className="capitalize max-w-[180px] truncate">{parcel.title}</td>
                <td>
                  {new Date(parcel.creation_date).toLocaleDateString("en-GB")}
                </td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="text-center space-x-2">
                  <Link
                    to={`/dashboard/parcel/${parcel._id}`}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    View
                  </Link>

                  {parcel.payment_status === "unpaid" && (
                    <Link
                      to={`/payment/${parcel._id}`}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      Pay
                    </Link>
                  )}

                  <button
                    onClick={() => handleDelete(parcel)}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CARD VIEW (MOBILE) ================= */}
      <div className="md:hidden space-y-4">
        {parcels.map((parcel) => (
          <div
            key={parcel._id}
            className="bg-base-100 rounded-xl shadow-md p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold capitalize">
                {parcel.parcelType}
              </span>
              <span
                className={`badge ${
                  parcel.payment_status === "paid"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {parcel.payment_status}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Created:{" "}
              {new Date(parcel.creation_date).toLocaleDateString("en-GB")}
            </p>

            <p className="font-bold my-2">Cost: ৳{parcel.cost}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <Link
                to={`/dashboard/parcel/${parcel?._id}`}
                className="btn btn-sm btn-outline btn-info flex-1"
              >
                View
              </Link>

              {parcel.payment_status === "unpaid" && (
                <Link
                  to={`/payment/${parcel._id}`}
                  className="btn btn-sm btn-outline btn-success flex-1"
                >
                  Pay
                </Link>
              )}

              <button
                onClick={() => handleDelete(parcel)}
                className="btn btn-sm btn-outline btn-error flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserParcels