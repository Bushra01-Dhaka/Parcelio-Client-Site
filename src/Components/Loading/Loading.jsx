import { FaTruckMoving, FaBoxOpen } from "react-icons/fa";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      
      {/* ICON ANIMATION */}
      <div className="relative flex items-center justify-center">
        <FaBoxOpen className="text-5xl text-primary animate-pulse" />
        <FaTruckMoving className="absolute -right-10 text-4xl text-secondary animate-bounce" />
      </div>

      {/* DAISYUI LOADER */}
      <span className="loading loading-dots loading-md text-primary"></span>

      {/* TEXT */}
      <p className="text-sm font-semibold text-gray-500">
        {text}
      </p>
    </div>
  );
};

export default Loading;
