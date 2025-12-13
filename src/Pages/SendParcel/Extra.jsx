import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const parcelType = watch("parcelType");
  const [cost, setCost] = useState(null);

  const serviceCenters = useLoaderData();
  //Extract Unique Regions
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))]

//   get district by region
   const getDistrictsByRegion = (region) => 
     serviceCenters.filter((w) => w.region === region).map((w) => w.district);


  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const onSubmit = (data) => {
    console.log("Parcel Data:", data);
    // later → cost calculation + toast + confirm
    let baseCost = data.parcelType === "document" ? 50 : 100;
    if (data.weight) baseCost += Number(data.weight) * 10;

    setCost(baseCost);
    // toast will be here
    console.log("Cost", cost)
    toast((t) => (
  <div className="bg-primary p-2">
     <p className="btn btn-primary text-secondary ">Delivary Cost: ${cost} tk</p>
    <button 
    className="btn btn-secondary border-0 text-primary rounded-0 font-semibold"
    onClick={() => {
        toast.dismiss(t.id);
        const parcelData = {
            ...data,
            cost,
            creation_date: new Date().toISOString(),
        }
        console.log("Saving", parcelData);
        toast.success("Parcel Created Successfully")
    }}>
      Dismiss
    </button>
  </div>
));
  };

  const saveParcel = (data, cost) => {
    const parcelData = {
      ...data,
      cost,
      creation_date: new Date().toISOString(),
    };

    console.log("Saving to DB: ", parcelData);
    // toast.success("Successfully toasted!");
    // send data to backend
  };

  return (
    <div className="min-h-screen bg-base-400 py-10 px-4">
      <div className="max-w-4xl text-secondary mx-auto bg-base-200 shadow-xl rounded-xl p-6 lg:p-10">
        {/* Heading */}
        <h1 className="text-3xl lg:text-6xl font-bold text-center">
          Send A Parcel
        </h1>
        <p className="text-center text-sm text-gray-500 mt-2">
          Door to Door delivery requires both pickup and delivery information
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-10 text-secondary"
        >
          {/* ================= Parcel Info ================= */}
          <div>
            <h2 className="text-lg font-bold mb-4">Parcel Information</h2>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Parcel Type */}
              <div className="form-control">
                <label className="label">Type</label>
                <select
                  className="select select-bordered"
                  {...register("parcelType", { required: true })}
                >
                  <option value="">Select type</option>
                  <option value="document">Document</option>
                  <option value="non-document">Non-document</option>
                </select>
                {errors.parcelType && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>

              {/* Title */}
              <div className="form-control">
                <label className="label">Parcel Title</label>
                <input
                  type="text"
                  placeholder="e.g. Important papers"
                  className="input input-bordered"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>

              {/* Weight (optional) */}
              {parcelType === "non-document" && (
                <div className="form-control">
                  <label className="label">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Optional"
                    className="input input-bordered"
                    {...register("weight")}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ================= Sender Info ================= */}
          <div>
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
                {
                    uniqueRegions.map((region) => (<option
                        key={region} 
                        value={region}>{region}</option>))
                }
              </select>
              <select
                className="select select-bordered"
                {...register("senderCenter", { required: true })}
              >
                <option value="">Select Service Center</option>
                {
                     getDistrictsByRegion(senderRegion).map((district) => (<option 
                        key={district}
                        value={district}>{district}</option>))
                }
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
          </div>

          {/* ================= Receiver Info ================= */}
          <div>
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
                {
                    uniqueRegions.map((region) => (<option
                        key={region} 
                        value={region}>{region}</option>))
                }
                
              </select>
              <select
                className="select select-bordered"
                {...register("receiverCenter", { required: true })}
              >
                <option value="">Select Service Center</option>
                     {
                     getDistrictsByRegion(receiverRegion).map((district) => (<option 
                        key={district}
                        value={district}>{district}</option>))
                }
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
          </div>

          {/* Submit */}
          <div className="text-center">
            <button className="btn btn-block btn-primary text-secondary font-bold px-10">
              Submit Parcel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
