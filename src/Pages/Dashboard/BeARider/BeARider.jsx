import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RiderImg from "../../../assets/rider.png"

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();


  const {
    register,
    handleSubmit,
    watch,
    refetch,
    formState: { errors },
  } = useForm();

  /* ================= REGION & DISTRICT ================= */
  const selectedRegion = watch("region");


  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const getDistrictsByRegion = (region) =>
    serviceCenters
      .filter((c) => c.region === region)
      .map((c) => c.district);

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    const riderData = {
      name: user?.displayName,
      email: user?.email,
      age: data.age,
      phone: data.phone,
      region: data.region,
      district: data.district,
      nid: data.nid,
      bikeBrand: data.bikeBrand,
      bikeRegistration: data.bikeRegistration,
      status: "pending",
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/riders", riderData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted 🚴",
          text: "Your rider application is now under review.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="md:max-w-screen-xl flex justify-between gap-6 lg:px-20 items-start  px-4 py-10">
    {/* left */}
      <div className="flex-2 p-4">
        {/* ================= HEADER ================= */}
      <h1 className="text-3xl lg:text-5xl font-bold mb-3">
        Be a Rider
      </h1>

      <p className=" text-gray-600 mb-8">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card bg-base-100 shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div>
          <label className="label text-secondary text-sm font-semibold">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label text-secondary text-sm font-semibold">Email</label>
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Age */}
        <div>
          <label className="label text-secondary text-sm font-semibold">Age</label>
          <input
            type="number"
            {...register("age", { required: true, min: 18 })}
            className="input input-bordered w-full"
            placeholder="Minimum age 18"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">Age must be 18 or above</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="label text-secondary text-sm font-semibold">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            className="input input-bordered w-full"
            placeholder="01XXXXXXXXX"
          />
        </div>

        {/* Region */}
        <div>
          <label className="label text-secondary text-sm font-semibold">Region</label>
          <select
            {...register("region", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label text-secondary text-sm font-semibold">District</label>
          <select
            {...register("district", { required: true })}
            className="select select-bordered w-full"
            disabled={!selectedRegion}
          >
            <option value="">Select District</option>
            {selectedRegion &&
              getDistrictsByRegion(selectedRegion).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
        </div>

        {/* National ID */}
        <div>
          <label className="label text-secondary text-sm font-semibold">National ID Number</label>
          <input
            type="text"
            {...register("nid", { required: true })}
            className="input input-bordered w-full"
            placeholder="NID Number"
          />
        </div>

        {/* Bike Brand */}
        <div>
          <label className="label text-secondary text-sm font-semibold">Bike Brand</label>
          <input
            type="text"
            {...register("bikeBrand", { required: true })}
            className="input input-bordered w-full"
            placeholder="Honda / Yamaha / Bajaj"
          />
        </div>

        {/* Bike Registration */}
        <div className="md:col-span-2">
          <label className="label text-secondary text-sm font-semibold">Bike Registration Number</label>
          <input
            type="text"
            {...register("bikeRegistration", { required: true })}
            className="input input-bordered w-full"
            placeholder="Bike Registration Number"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 mt-4">
          <button className="btn text-secondary font-bold btn-primary w-full">
            Apply as Rider
          </button>
        </div>
      </form>
      </div>

      {/* right */}
      <div className="flex-1">
        <img className="w-[500px] h-[400px]" src={RiderImg} alt="" />
      </div>


    </div>
  );
};

export default BeARider;
