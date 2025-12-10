
import Banner from "../../Components/Home-Comonents/Banner"
import BeAMarchent from "../../Components/Home-Comonents/BeAMarchent"
import BrandMarques from "../../Components/Home-Comonents/BrandMarques"
import Faq from "../../Components/Home-Comonents/Faq"
import Features from "../../Components/Home-Comonents/Features"
import Testimonial from "../../Components/Home-Comonents/Testimonial"
import WhyChooseUs from "../../Components/Home-Comonents/WhyChooseUs"
import OurServices from "../Services/OurServices"


const Home = () => {
  return (
    <div>
        <Banner/>
        <Features/>
        <OurServices/>
        <BrandMarques/>
        <WhyChooseUs/>
        <BeAMarchent/>
        <Testimonial/>
        <Faq/>
    </div>
  )
}

export default Home