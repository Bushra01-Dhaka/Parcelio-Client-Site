import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQueries } from "@tanstack/react-query";

// Tracking Id generator
const generateTrackingId = () => {
  const prefix = "PX";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `${prefix}-${date}-${random}`;
};

/* ================= COST CALCULATION ================= */
const calculateCost = (data) => {
  const sameDistrict = data.senderCenter === data.receiverCenter;
  let cost = 0;

  if (data.parcelType === "document") {
    cost = sameDistrict ? 60 : 80;
  }

  if (data.parcelType === "non-document") {
    const weight = Number(data.weight || 0);

    if (weight <= 3) {
      cost = sameDistrict ? 110 : 150;
    } else {
      const extraWeight = weight - 3;
      cost = sameDistrict
        ? 110 + extraWeight * 40
        : 150 + extraWeight * 40 + 40;
    }
  }

  return cost;
};

// NEW ADDED THING
const getPricingBreakdown = (data) => {
  const sameDistrict = data.senderCenter === data.receiverCenter;
  const weight = Number(data.weight || 0);

  let base = 0;
  let extraWeightCharge = 0;
  let outsideExtra = 0;

  if (data.parcelType === "document") {
    base = sameDistrict ? 60 : 80;
  }

  if (data.parcelType === "non-document") {
    if (weight <= 3) {
      base = sameDistrict ? 110 : 150;
    } else {
      base = sameDistrict ? 110 : 150;
      extraWeightCharge = (weight - 3) * 40;
      if (!sameDistrict) outsideExtra = 40;
    }
  }

  const total = base + extraWeightCharge + outsideExtra;

  return {
    sameDistrict,
    base,
    extraWeightCharge,
    outsideExtra,
    total,
  };
};

// ends


const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const serviceCenters = useLoaderData();

  /* ================= REGIONS & DISTRICTS ================= */
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

  const getDistrictsByRegion = (region) =>
    serviceCenters.filter((w) => w.region === region).map((w) => w.district);

  /* ================= SUBMIT ================= */
  const onSubmit = (data) => {
    const pricing = getPricingBreakdown(data);
    const weight = Number(data.weight || 0);
    const extraKg = weight > 3 ? weight - 3 : 0;

    Swal.fire({
      title: "Confirm Delivery Cost",
      icon: "info",
      html: `
      <div class="text-left space-y-2 text-sm">

        <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
        <p><strong>Delivery:</strong> ${
          pricing.sameDistrict ? "Within District" : "Outside District"
        }</p>

        <hr />

        <p><strong>Base Price:</strong> ৳${pricing.base}</p>

        ${
          extraKg > 0
            ? `
              <div class="bg-gray-100 p-2 rounded-md">
                <p class="font-semibold">Extra Weight Calculation:</p>
                <p>• Base weight allowance: <strong>3 kg</strong></p>
                <p>• Parcel weight: <strong>${weight} kg</strong></p>
                <p>• Extra weight: <strong>${extraKg} kg</strong></p>
                <p>• Rate: <strong>৳40 per kg</strong></p>
                <p class="mt-1">
                  ➜ ${extraKg} × 40 = 
                  <strong>৳${pricing.extraWeightCharge}</strong>
                </p>
              </div>
            `
            : ""
        }

        ${
          pricing.outsideExtra
            ? `
              <p>
                <strong>Outside District Extra Charge:</strong>
                ৳${pricing.outsideExtra}
              </p>
            `
            : ""
        }

        <hr />

        <p style="font-size:18px; color:#1A1A1D;">
          <strong>Total Payable: ৳${pricing.total}</strong>
        </p>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Go Back & Edit",
      confirmButtonColor: "#B7D55C",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: pricing.total,
          created_by: user?.email,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          tracking_id: generateTrackingId(),
          creation_date: new Date().toISOString(),
        };

        console.log("Saving Parcel:", parcelData);


        axiosSecure.post(`/parcels`,parcelData)
        .then((res) => {
          console.log(res.data)
          if(res.data.insertedId){
              // TODO: will redirect to payment page navigate("/payment", { state: parcelData });  💩💩💩💩

          Swal.fire({
          icon: "success",
          title: "Parcel Created!",
          text: "Redirecting to payment...",
          timer: 2000,
          showConfirmButton: false,
        });
          }
        })

      }
    });
  };

  return (
    <div className="min-h-screen bg-base-300 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl p-6 lg:p-10 text-secondary">
        {/* ================= HEADER ================= */}
        <h1 className="text-3xl lg:text-5xl font-bold text-center">
          Send A Parcel
        </h1>
        <p className="text-center text-sm text-gray-500 mt-2">
          Door to Door delivery requires both pickup and delivery information
        </p>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-10">
          {/* ================= PARCEL INFO ================= */}
          <section>
            <h2 className="text-lg font-bold mb-4">Parcel Information</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <select
                className="select select-bordered"
                {...register("parcelType", { required: true })}
              >
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>

              <input
                className="input input-bordered"
                placeholder="Parcel Title"
                {...register("title", { required: true })}
              />

              {parcelType === "non-document" && (
                <input
                  type="number"
                  step="0.1"
                  className="input input-bordered"
                  placeholder="Weight (kg)"
                  {...register("weight")}
                />
              )}
            </div>
          </section>

          {/* ================= SENDER INFO ================= */}
          <section>
            <h2 className="text-lg font-bold mb-4">Sender Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="input input-bordered"
                placeholder="Sender Name"
                {...register("senderName", { required: true })}
              />

              <input
                className="input input-bordered"
                placeholder="Sender Contact"
                {...register("senderContact", { required: true })}
              />

              <select
                className="select select-bordered"
                {...register("senderRegion", { required: true })}
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered"
                {...register("senderCenter", { required: true })}
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(senderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              <input
                className="input input-bordered md:col-span-2"
                placeholder="Pickup Address"
                {...register("senderAddress", { required: true })}
              />

              <textarea
                className="textarea textarea-bordered md:col-span-2"
                placeholder="Pickup Instruction"
                {...register("pickupInstruction", { required: true })}
              />
            </div>
          </section>

          {/* ================= RECEIVER INFO ================= */}
          <section>
            <h2 className="text-lg font-bold mb-4">Receiver Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="input input-bordered"
                placeholder="Receiver Name"
                {...register("receiverName", { required: true })}
              />

              <input
                className="input input-bordered"
                placeholder="Receiver Contact"
                {...register("receiverContact", { required: true })}
              />

              <select
                className="select select-bordered"
                {...register("receiverRegion", { required: true })}
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered"
                {...register("receiverCenter", { required: true })}
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              <input
                className="input input-bordered md:col-span-2"
                placeholder="Delivery Address"
                {...register("receiverAddress", { required: true })}
              />

              <textarea
                className="textarea textarea-bordered md:col-span-2"
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction", { required: true })}
              />
            </div>
          </section>

          {/* ================= SUBMIT ================= */}
          <button className="btn btn-primary btn-block text-secondary font-bold">
            Submit Parcel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
