import liveTracking from "../../assets/live-tracking.png"
import safeDelivery from "../../assets/safe-delivery.png"


const WhyChooseUs = () => {
  return (
    <div className="flex justify-center items-center min-h-[100vh] md:max-w-screen-xl mx-auto  my-20 rounded-2xl shadow-2xl px-10">

        <div>

          <div className="grid grid-cols-1 gap-6 text-secondary my-20">

           <div  data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-delay="100"
            data-aos-duration="1000" className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-slate-50 rounded-xl shadow-2xl">
                {/* left */}
                <div>
                   <img className="lg:w-[200px] lg:h-[200px] p-4" src={liveTracking} alt="" />
                </div>
                {/* right */}
                <div className="p-4 border-0 border-l-1 border-slate-800 border-dashed ">
                  <h2 className="text-xl font-bold">Live Parcel Tracking</h2>
                  <p className="py-4 lg:w-[900px]">Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
           </div>

            <div
             data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-delay="200"
            data-aos-duration="1000"
            className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-slate-50 rounded-xl shadow-2xl">
                {/* left */}
                <div>
                   <img className="lg:w-[200px] lg:h-[200px] p-4" src={safeDelivery} alt="" />
                </div>
                {/* right */}
                <div className="p-4 border-0 border-l-1 border-slate-800 border-dashed ">
                  <h2 className="text-xl font-bold">100% Safe Delivery</h2>
                  <p className="py-4 lg:w-[900px]">Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
           </div>

            <div 
            data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-delay="300"
            data-aos-duration="1000"
            className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-slate-50 rounded-xl shadow-2xl">
                {/* left */}
                <div>
                   <img className="lg:w-[200px] lg:h-[200px] p-4" src={safeDelivery} alt="" />
                </div>
                {/* right */}
                <div className="p-4 border-0 border-l-1 border-slate-800 border-dashed ">
                  <h2 className="text-xl font-bold">24/7 Call Center Support</h2>
                  <p className="py-4 lg:w-[900px]">Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                </div>
           </div>


        </div>


        </div>
    </div>
  )
}

export default WhyChooseUs