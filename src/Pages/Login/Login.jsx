import { Link, useLocation, useNavigate } from "react-router";
import ParcelioLogo from "../../Components/Home-Comonents/ParcelioLogo";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        console.log(data);

        login(data.email, data.password)
        .then((result) => {
          console.log(result.user);
          navigate(from);
        })
        .catch(error => {
          console.error(error);
        })
      };
    
  return (
    <div className="">
      {/* logo setup */}
      <div className="flex justify-start items-start pb-6">
        <ParcelioLogo />
      </div>

      <div className="card-body w-full lg:w-[500px] bg-primary p-10 rounded-xl shadow-2xl my-8">
        <h2 className="text-3xl lg:text-4xl text-secondary font-extrabold pt-6">
          Welcome Back
        </h2>
        <p className="pb-10">Login with Parcelio</p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset w-full text-secondary">

          <label className="label font-bold text-secondary">Email</label>
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



          <label className="label font-bold text-secondary">Password</label>
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


          <button className="btn  btn-secondary text-primary mt-4">
            Login
          </button>
        </fieldset>

        </form>



        <div>
          <p>
            Don't have an account?
            <Link to="/register" className="-ml-2 btn text-secondary btn-link">
              Register
            </Link>
          </p>
          <button className="btn hover:bg-slate-200 mt-8 w-full bg-white text-black border-secondary">
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
            Login with Google
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
