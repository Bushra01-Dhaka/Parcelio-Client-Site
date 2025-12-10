
import Banner from "../../Components/Home-Comonents/Banner"
import BeAMarchent from "../../Components/Home-Comonents/BeAMarchent"
import Faq from "../../Components/Home-Comonents/Faq"
import Features from "../../Components/Home-Comonents/Features"
import Testimonial from "../../Components/Home-Comonents/Testimonial"
import WhyChooseUs from "../../Components/Home-Comonents/WhyChooseUs"


const Home = () => {
  return (
    <div>
        <Banner/>
        <Features/>
        <WhyChooseUs/>
        <BeAMarchent/>
        <Testimonial/>
        <Faq/>
    </div>
  )
}

export default Home