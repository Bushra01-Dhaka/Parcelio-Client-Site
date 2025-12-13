import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";

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

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const serviceCenters = useLoaderData();

  /* ================= REGIONS & DISTRICTS ================= */
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

  const getDistrictsByRegion = (region) =>
    serviceCenters
      .filter((w) => w.region === region)
      .map((w) => w.district);

  /* ================= SUBMIT ================= */
  const onSubmit = (data) => {
    const finalCost = calculateCost(data);

    toast((t) => (
      <div className="bg-base-100 p-4 rounded-xl shadow-xl w-64">
        <p className="text-lg font-bold text-primary">
          Delivery Cost: ৳{finalCost}
        </p>

        <button
          className="btn btn-primary btn-sm w-full mt-4"
          onClick={() => {
            toast.dismiss(t.id);

            const parcelData = {
              ...data,
              cost: finalCost,
              creation_date: new Date().toISOString(),
            };

            console.log("Saving Parcel:", parcelData);
            toast.success("Parcel Created Successfully");
          }}
        >
          Confirm
        </button>
      </div>
    ));
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-10"
        >
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
