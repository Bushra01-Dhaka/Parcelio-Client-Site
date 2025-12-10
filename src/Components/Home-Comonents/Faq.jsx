import { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const faqData = [
  {
    q: "How does this posture corrector work?",
    a: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here’s how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders."
  },
  {
    q: "Is it suitable for all ages and body types?",
    a: "Yes, it’s designed to fit most ages and body types with adjustable straps for a comfortable and secure fit."
  },
  {
    q: "Does it really help with back pain and posture improvement?",
    a: "Yes, it gently aligns your spine and shoulders, helping reduce back pain and improve posture."
  },
  {
    q: "Does it have smart features like vibration alerts?",
    a: "Yes, it includes smart vibration reminders that alert you whenever you slouch."
  },
  {
    q: "How will I be notified when the product is back in stock?",
    a: "You’ll receive an instant email notification as soon as the product is available again."
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-slate-200 text-secondary p-8 lg:p-20">
      <div>
        <div className="text-center pb-6">
          <h2 className="text-3xl lg:text-4xl font-bold py-4">Frequently Asked Questions</h2>
          <p className="pb-4 lg:w-[800px] mx-auto w-full">
            Enhance posture, mobility, and well-being effortlessly with Posture Pro.
          </p>
        </div>

        <div className="py-10 grid grid-cols-1 gap-6 lg:w-[1000px] w-full mx-auto">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="p-6 border-1 border-[#016A70] rounded-xl shadow-md bg-slate-50"
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(index)}>
                <p className="text-lg lg:text-xl font-bold pb-4">{item.q}</p>

                <p className="text-4xl font-bold text-[#016A70]">
                  {activeIndex === index ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                </p>
              </div>

              {/* Animation container */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden
                  ${activeIndex === index ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"}
                `}
              >
                <p className="pt-2 text-md">{item.a}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
