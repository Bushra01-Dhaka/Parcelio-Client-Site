import marchentImg from "../../assets/marchentImg.png";
import shadowImg from "../../assets/shadow.png";

const BeAMarchent = () => {
  return (
    <div
    data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="1000"
    className="bg-[#016A70]
 
 
  rounded-2xl
  shadow-primary
  shadow-2xl
  flex justify-center items-center
  min-h-[60vh]
  m-20
  md:max-w-screen-xl
  mx-auto">
      <div 
      className="flex justify-center flex-col lg:flex-row items-center gap-6 p-6">
        {/* left */}
        <div className="lg:w-[670px] w-full">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#ffff]">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="py-4 lg:w-[500px] text-secondary font-semibold">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Parcelio courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="py-6 font-bold">
            <a href="/sendParcel" className="btn hover:shadow-md hover:shadow-primary font-semibold btn-primary text-secondary rounded-2xl mr-4 mb-4 lg:mb-0">
              Become a Merchant
            </a>
            <a className="btn font-bold btn-primary hover:btn-primary btn-outline hover:text-secondary hover:bg-primary rounded-2xl  ">
              Earn With Parcelio Courier
            </a>
          </div>
        </div>
        {/* right */}
        <div>
          <img className="w-full lg:w-[500px]" src={marchentImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BeAMarchent;
