// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { useState } from "react";

// const AssignRider = () => {
//   const axiosSecure = useAxiosSecure();
//     const [selectedParcel, setSelectedParcel] = useState(null);
//   const [riders, setRiders] = useState([]);
//   const [loadingRiders, setLoadingRiders] = useState(false);

//   const {
//     data: parcels = [],
//     isLoading,
//   } = useQuery({
//     queryKey: ["assignable-parcels"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         "/parcels?payment_status=paid&delivery_status=not_collected"
//       );
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-20">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }


//    /* ================= OPEN MODAL ================= */
//   const handleOpenAssignModal = async (parcel) => {
//     setSelectedParcel(parcel);
//     setLoadingRiders(true);

//     try {
//       const res = await axiosSecure.get(
//         `/riders/by-district/${parcel.senderCenter}`
//       );
//       setRiders(res.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingRiders(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-20">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-8">
//       <h2 className="text-2xl md:text-4xl font-bold mb-8">
//         Assign Rider
//       </h2>

//       <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Tracking ID</th>
//               <th>Sender</th>
//               <th>Receiver</th>
//               <th>Destination</th>
//               <th>Cost</th>
//               <th>Status</th>
//               <th className="text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {parcels.map((parcel, index) => (
//               <tr key={parcel._id}>
//                 <td>{index + 1}</td>

//                 <td className="font-semibold">
//                   {parcel.tracking_id}
//                 </td>

//                 <td>
//                   <p className="font-medium">{parcel.senderName}</p>
//                   <p className="text-xs text-gray-500">
//                     {parcel.senderContact}
//                   </p>
//                 </td>

//                 <td>
//                   <p className="font-medium">{parcel.receiverName}</p>
//                   <p className="text-xs text-gray-500">
//                     {parcel.receiverContact}
//                   </p>
//                 </td>

//                 <td>
//                   {parcel.receiverRegion} <br />
//                   <span className="text-xs text-gray-500">
//                     {parcel.receiverCenter}
//                   </span>
//                 </td>

//                 <td>৳{parcel.cost}</td>

//                 <td>
//                   <span className="badge text-secondary font-bold badge-warning">
//                     {parcel.delivery_status}
//                   </span>
//                 </td>

//                 <td className="text-center">
//                   <button
//                     className="btn text-secondary font-bold btn-xs btn-primary"
//                      onClick={() => handleOpenAssignModal(parcel)}
//                   >
//                     Assign Rider
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {parcels.length === 0 && (
//           <p className="text-center py-10 text-gray-500">
//             No parcels available for rider assignment
//           </p>
//         )}
//       </div>

//         {/* ================= MODAL ================= */}
//       {selectedParcel && (
//         <dialog open className="modal modal-bottom sm:modal-middle">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg mb-2">
//               Assign Rider
//             </h3>

//             <p className="text-sm mb-4">
//               Service Center:{" "}
//               <span className="font-semibold">
//                 {selectedParcel.service_center}
//               </span>
//             </p>

//             {loadingRiders ? (
//               <div className="flex justify-center py-6">
//                 <span className="loading loading-spinner"></span>
//               </div>
//             ) : riders.length === 0 ? (
//               <p className="text-center text-gray-500">
//                 No riders available in this district
//               </p>
//             ) : (
//               <div className="space-y-2 max-h-64 overflow-y-auto">
//                 {riders.map((rider) => (
//                   <div
//                     key={rider._id}
//                     className="flex justify-between items-center p-3 border rounded-lg"
//                   >
//                     <div>
//                       <p className="font-semibold">{rider.name}</p>
//                       <p className="text-xs text-gray-500">
//                         {rider.phone}
//                       </p>
//                     </div>

//                     <button
//                       className="btn btn-xs btn-success"
//                       onClick={() =>
//                         console.log(
//                           "Assign rider:",
//                           rider._id,
//                           "to parcel:",
//                           selectedParcel._id
//                         )
//                       }
//                     >
//                       Assign
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="modal-action">
//               <button
//                 className="btn btn-outline"
//                 onClick={() => {
//                   setSelectedParcel(null);
//                   setRiders([]);
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </dialog>
//       )}


//     </div>
//   );
// };

// export default AssignRider;
