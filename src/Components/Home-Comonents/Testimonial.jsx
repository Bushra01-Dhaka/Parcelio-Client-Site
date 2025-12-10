// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import commentImg from "../../assets/review.png";

// import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import testimonialImg from "../../assets/customer-top.png";
import { useEffect, useState } from "react";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`/reviews.json`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

   console.log(reviews)
  return (
    <div className="bg-slate-200 flex justify-center items-center text-secondary p-10 lg:p-20">
      <div>
        <div className="text-center pt-6">
          <img className="mx-auto" src={testimonialImg} alt="" />
          <h2 className="text-2xl lg:text-4xl font-bold py-4">
            What our customers are sayings
          </h2>
          <p className="pb-4 lg:w-[800px] mx-auto w-full">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        <div  className="min-h-[400px] my-10">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
             autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, FreeMode, Pagination]}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mySwiper  h-[350px] w-[400px] lg:h-[300px] lg:w-[1000px]  rounded-2xl shadow-2xl cursor-pointer p-4"
          >
            {reviews.map((item) => (
              <SwiperSlide item={item} key={item?.id} className="p-6 bg-[#ffffff] text-secondary hover:bg-primary">
                <div>
                  <img className="w-[100px]" src={commentImg} alt="" />
                  <p className="py-4 font-semibold">{item?.review}</p>

                  <div className="flex gap-4 justify-start items-center py-6">
                    <img
                      className="w-[60px] h-[60px] object-cover rounded-[50px]"
                      src={item?.user_photoURL}
                      alt=""
                    />
                    <div>
                      <p className="text-lg font-bold pb-t">{item?.userName}</p>
                      <p className="text-md pb-2">{item?.user_email}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
   
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
