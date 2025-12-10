import Marquee from "react-fast-marquee"
import img1 from "../../assets/brands/1.png"
import img2 from "../../assets/brands/2.png"
import img3 from "../../assets/brands/3.png"
import img4 from "../../assets/brands/4.png"
import img5 from "../../assets/brands/5.png"
import img6 from "../../assets/brands/6.png"
import img7 from "../../assets/brands/7.png"

const BrandMarques = () => {
  return (
    <div className="flex justify-center items-center bg-[#f6eded]  px-10">
      <div className="py-6">
        <h3 className="text-2xl text-center font-bold text-secondary pt-6 pb-10">We've helped thousands of sales teams</h3>
         <Marquee >
            <div className="flex justify-center items-center gap-10">
                  <img src={img2} alt="" />
             <img src={img3} alt="" />
             <img src={img4} alt="" />
             <img src={img5} alt="" />
             <img src={img6} alt="" />
            </div>
         </Marquee>
      </div>
    </div>
  )
}

export default BrandMarques