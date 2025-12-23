// import { Link } from "react-router"
// import forbiddenPageImg from "../../assets/403.webp"

// const ForbiddenPage = () => {
//   return (
//     <div className="min-h-screen flex justify-center items-center ">
//         <div>
//            <Link to="/">
//            <img src={forbiddenPageImg} alt="" />
//            </Link>
//         </div>
//     </div>
//   )
// }

// export default ForbiddenPage

import { Link } from "react-router";
import { FaLock, FaHome, FaArrowLeft } from "react-icons/fa";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-2xl rounded-2xl p-8 md:p-12 max-w-md w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-error/10 p-5 rounded-full">
            <FaLock className="text-error text-5xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-error">
          Access Forbidden
        </h1>

        {/* Message */}
        <p className="text-gray-500 mb-6">
          You don’t have permission to access this page.
          <br />
          Please contact admin if you think this is a mistake.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="btn text-secondary btn-primary gap-2"
          >
            <FaHome />
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="btn btn-outline btn-secondary hover:text-primary gap-2"
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
