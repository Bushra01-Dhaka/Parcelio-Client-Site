import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.photoURL);

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_uploader_key
      }`;

      const res = await axios.post(imageUploadUrl, formData);
      const imageUrl = res.data.data.url;

      // 🔹 Update Firebase Auth
      await updateUserProfile({ photoURL: imageUrl });

      // 🔹 Update DB (recommended)
      await axiosSecure.patch("/users/update-photo", {
        email: user?.email,
        photoURL: imageUrl,
      });

      setImagePreview(imageUrl);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile picture has been updated successfully!",
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-xl p-6 md:p-8">

        {/* ================= HEADER ================= */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          My Profile
        </h2>

        {/* ================= PROFILE ================= */}
        <div className="flex flex-col md:flex-row items-center gap-6">

          {/* Avatar */}
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  imagePreview ||
                  "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                }
                alt="Profile"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 text-center md:text-left">
            <p>
              <strong>Name:</strong>{" "}
              <span className="text-gray-600">
                {user?.displayName}
              </span>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <span className="text-gray-600">
                {user?.email}
              </span>
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              <span className="text-gray-600">
                {new Date(
                  user?.metadata?.creationTime
                ).toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        {/* ================= UPLOAD ================= */}
        {/* <div className="mt-6">
          <label className="label">
            <span className="label-text font-semibold">
              Change Profile Picture
            </span>
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
            disabled={uploading}
          />

          {uploading && (
            <p className="text-sm text-gray-500 mt-2">
              Uploading image...
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default UpdateProfile;
