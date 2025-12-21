import { Link, useLocation, useNavigate } from "react-router";
import ParcelioLogo from "../../Components/Home-Comonents/ParcelioLogo";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  
  const {createUser, updateUserProfile, googleLogIn} = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState('');
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
   const from = location.state?.from || "/";
 
  const {
    register,
    handleSubmit,
    watch,
    refetch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    
    createUser(data.email, data.password)
    .then(async (result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        
        // update user info in the database
        const userInfo = {
          role: "user",
          email: data.email,
          name: data.name,
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        }

        const userRes = await axiosPublic.post(`/users`, userInfo);
        console.log(userRes.data);



        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        }
        updateUserProfile(userProfile)
        .then(() => {
          console.log("Profile Name and Picture updated");
          refetch;
        } )
        .catch(error => {
          console.error(error);
        })





        navigate(from)
        refetch();
    })
    .catch(error => console.error(error))
  };


  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image)
    const formData = new FormData();
    formData.append('image', image)
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_uploader_key}`

    const res = await axios.post(imageUploadUrl, formData)
    setProfilePic(res.data.data.url)
  };


  const handleGoogleLogin = () => {
        googleLogIn()
        .then(result => {
          const user = result.user;
          console.log(user);
          // update user info into db
          const userInfo = {
            role:"user",
            email: user?.email,
            name: result?.user?.displayName,
            created_at: new Date().toISOString(),
            last_log_in: new Date().toISOString(),
          }
          
          axiosSecure.post('/users', userInfo)
          .then((res) => {
            console.log("User data has been stored", res.data)
            navigate(location.state || '/')
          })

        })
        .catch(error => {
          console.log(error)
        })
    }

  return (
    <div className="">
      {/* Logo setup */}
      <div className="flex justify-start items-start pb-6">
        <ParcelioLogo />
      </div>
      <div className="card-body w-full bg-primary p-6  lg:p-10 rounded-xl shadow-2xl lg:my-8">
        <h2 className="text-2xl lg:text-4xl text-secondary font-extrabold pt-6">
          Create An Account
        </h2>
        <p className="pb-10">Register with Parcelio</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset w-full text-secondary">
            <label className="label font-bold text-secondary mt-4">Name</label>
            <input
              type="text"
              className="input w-full "
              placeholder="Name"
              {...register("name", { required: true })}
            />

            {errors.name?.type === "required" && (
              <p
                role="alert"
                className=" font-semibold px-2 text-[14px] text-red-500"
              >
                Name is required
              </p>
            )}

            
            <label className="label font-bold text-secondary mt-4">Profile Picture</label>
            <input 
            type="file" 
            className="input"
            onChange={handleImageUpload}
            placeholder="Your Profile Picture"
             />



            <label className="label font-bold text-secondary mt-4">Email</label>
            <input
              type="email"
              className="input w-full "
              placeholder="Email"
              {...register("email", { required: true })}
            />

            {errors.email?.type === "required" && (
              <p
                role="alert"
                className=" font-semibold px-2 text-[14px] text-red-500"
              >
                Email is required
              </p>
            )}

            <label className="label font-bold text-secondary mt-4">
              Password
            </label>
            <input
              type="password"
              className="input w-full "
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
            />

            {errors.password?.type === "required" && (
              <p
                role="alert"
                className=" font-semibold px-2 text-[14px] text-red-500"
              >
                Password is required
              </p>
            )}

            {errors.password?.type === "minLength" && (
              <p
                role="alert"
                className=" font-semibold px-2 text-[14px] text-red-500"
              >
                Password should have 6 digits or more
              </p>
            )}

             {errors.password?.type === "pattern" && (
              <p
                role="alert"
                className=" font-semibold px-2 text-[14px] text-red-500"
              >
                Password must have 1 uppercase, 1 lowercase and 1 special
                  character.
              </p>
            )}



            {/* <div>
              <a className="link link-hover">Forgot password?</a>
            </div> */}

            <button
              type="submit"
              className="btn  btn-secondary text-primary mt-4"
            >
              Register
            </button>
          </fieldset>
        </form>

        <div>
          <p>
            Already have an account?
            <Link to="/login" className="-ml-2 btn text-secondary btn-link">
              Login
            </Link>
          </p>
          <button onClick={handleGoogleLogin} className="btn hover:bg-slate-200 mt-8 w-full bg-white text-black border-secondary">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Register with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
