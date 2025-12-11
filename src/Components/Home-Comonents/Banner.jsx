import tinyMan from "../../assets/tiny-deliveryman.png";
import riderImg from "../../assets/riderImg.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
     const t1 = gsap.timeline();

     t1.to("#rider", {
      opacity:1,
      right:"8%",
      duration:3,
      delay:1
     },'one')
      t1.to("#tinyRider", {
      left:"5%",
      duration:4,
      delay:1
     },'one')

  }, [])

  return (
    <div ref={bannerRef} className="py-10 flex justify-center items-center min-h-[100vh] px-8 lg:px-6 bg-[#016A70]">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 text-secondary">
        {/* left */}
        <div className="flex-1 lg:w-[630px] py-4">
          <img id="tinyRider" className="relative left-[-150px]" src={tinyMan} alt="" />
          <h2 data-aos="fade-right"
            data-aos-delay="50"
            data-aos-duration="2000" className="text-secondary text-4xl lg:text-6xl font-extrabold">
            We Make Sure Your{" "}
            <span className="text-primary">Parcel Arrives</span> On Time – No
            Fuss.
          </h2>
          <p className="py-4">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
          <div className="py-6 font-semibold">
            <a href="/register" className="btn btn-secondary btn-outline text-secondary hover:text-primary rounded-2xl mr-2 ">
              Sign In
            </a>
            <a className="btn btn-primary text-secondary rounded-2xl ">
              Be a Rider
            </a>
          </div>
        </div>
        {/* right */}
        <div>
           <img id="rider" className="relative opacity-0 right-[-150px] p-4" src={riderImg} alt="" />
        </div>


      </div>
    </div>
  );
};

export default Banner;
