import { useEffect, useState } from "react";
import serviceImg from "../../assets/service.png";

const OurServices = () => {
  const [services, setServices] = useState([]);
   const [isHovered, setIsHovered] = useState(false); // 🌟 NEW

  useEffect(() => {
    fetch(`services.json`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, []);

  console.log("Our Services", services);
  return (
    <div className={`flex justify-center lg:max-w-screen-2xl mx-auto items-center min-h-[100vh] lg:py-20 px-8 lg:px-0
      transition-all duration-500 
      ${isHovered ? "bg-primary" : ""}`}>
      <div className="bg-primary p-4 lg:p-10 rounded-md ">

        <div 
        data-aos="zoom-in"
            data-aos-delay="50"
            data-aos-duration="1000"
        className="text-center pt-10">
          <h2 className="text-4xl text-secondary lg:text-6xl font-extrabold py-4">
            Our Services
          </h2>
          <p className="pb-4 font-semibold  lg:w-[800px] mx-auto w-full">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-20">
          {services.map((item, index) => (
            <div
              item={item}
              key={index}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
               data-aos="zoom-up"
            data-aos-offset="200"
            data-aos-delay="100"
            data-aos-duration="1000"
              className="lg:w-[350px] text-secondary text-center bg-slate-50 rounded-xl shadow-2xl p-4 hover:bg-primary cursor-pointer"
            >
              <img
                className="w-[80px] p-4 h-[80px] mx-auto rounded-[50px] object-cover"
                src={serviceImg}
                alt=""
              />
              <h2 className="text-lg font-bold py-4">{item?.title}</h2>
              <p className="pt-0 p-4 text-md text-center">
                {item?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;
