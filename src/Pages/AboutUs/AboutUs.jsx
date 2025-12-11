import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import WhyChooseUs from '../../Components/Home-Comonents/WhyChooseUs';
import Testimonial from '../../Components/Home-Comonents/Testimonial';
import Faq from '../../Components/Home-Comonents/Faq';

const AboutUs = () => {
  return (
    <div className="py-20 px-6 lg:px-20">
      <div>
        <h2 className="text-5xl font-extrabold">About Us</h2>
        <p className="py-4 lg:w-[630px]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

             <Tabs className="pt-20 ">
              <TabList className="font-bold text-xl text-secondary">
                <Tab>Story</Tab>
                <Tab>Mission</Tab>
                <Tab>Success</Tab>
                <Tab>Terms & Condition</Tab>
              </TabList>

              <TabPanel>
                <div className="py-6">
                    <p className="text-md text-secondary">
                        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
                    </p>
                    <p className="py-4">
                        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
                    </p>
                    <p className="py-4">
                        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
                    </p>

                  <WhyChooseUs/>
                </div>
              </TabPanel>

              <TabPanel>
               <p className="py-6">
                Our mission is to provide meaningful value through high-quality products, reliable service, and a customer-first approach. We aim to create solutions that improve everyday living, support well-being, and offer a seamless experience from browsing to delivery. Every decision we make is driven by innovation, transparency, and a commitment to earning the trust of our customers.
               </p>
                <WhyChooseUs/>
              </TabPanel>

               <TabPanel>
                <p className="py-6">
                    We believe success is achieved through consistency, dedication, and a deep understanding of our customers’ needs. Over time, we have grown by listening carefully, improving constantly, and maintaining high standards in both product quality and user experience. Our achievements reflect the passion of our team and the support of our community, and we continue to evolve so we can deliver even better results in the future.
                </p>

                <Testimonial/>
              </TabPanel>

               <TabPanel>
                <p className="py-6">
                    Our terms and conditions outline the guidelines that ensure a safe, fair, and reliable experience for everyone using our platform. By accessing our services, customers agree to responsible usage, accurate information sharing, and respectful interaction. We remain committed to protecting your data, maintaining transparency in transactions, and resolving issues promptly. These policies help us create a secure environment while upholding the quality and integrity of our services.
                </p>

                <Faq/>
              </TabPanel>


            </Tabs>

       
      </div>
    </div>
  );
};

export default AboutUs;
