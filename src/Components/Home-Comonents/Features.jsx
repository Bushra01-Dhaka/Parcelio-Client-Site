import busImg from "../../assets/bus.png";

const Features = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] md:max-w-screen-[800px] mx-auto bg-primary">
      <div className="py-20">
        <h2 className="text-4xl text-secondary font-bold p-4">How It Works</h2>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 p-4">
          <div
            data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-delay="100"
            data-aos-duration="1000"
            className="lg:w-[300px] bg-slate-100 rounded-xl shadow-2xl p-6 text-secondary"
          >
            <img src={busImg} alt="" />
            <h3 className="text-xl pt-4 font-bold">Booking Pick & Drop</h3>
            <p className="py-2">
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          <div data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-delay="200"
            data-aos-duration="1000" className="lg:w-[300px] bg-slate-100 rounded-xl shadow-2xl p-6 text-secondary">
            <img src={busImg} alt="" />
            <h3 className="text-xl pt-4 font-bold">Cash On Delivery</h3>
            <p className="py-2">
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          <div data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-delay="300"
            data-aos-duration="1000" className="lg:w-[300px] bg-slate-100 rounded-xl shadow-2xl p-6 text-secondary">
            <img src={busImg} alt="" />
            <h3 className="text-xl pt-4 font-bold">Delivary Hub</h3>
            <p className="py-2">
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>

          <div data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-delay="400"
            data-aos-duration="1000" className="lg:w-[300px] bg-slate-100 rounded-xl shadow-2xl p-6 text-secondary">
            <img src={busImg} alt="" />
            <h3 className="text-xl pt-4 font-bold">Booking SME & Corporate</h3>
            <p className="py-2">
              From personal packages to business shipments — we deliver on time,
              every time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
