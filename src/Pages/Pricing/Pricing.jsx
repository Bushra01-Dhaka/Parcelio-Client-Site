import { FaFileAlt, FaBox, FaCity, FaTruck } from "react-icons/fa";

const Pricing = () => {
  return (
    <div 
    
     data-aos="fade-in"
    data-aos-offset="200"
    data-aos-delay="100"
    data-aos-duration="1000"
    className="p-4 md:p-10 max-w-6xl mx-auto">
      {/* 🔹 Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-3">
          Pricing & Charges
        </h2>
        <p className="text-gray-500">
          Transparent pricing for all your parcel deliveries
        </p>
      </div>

      {/* 🔹 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Document */}
        <div className="bg-base-100 shadow rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaFileAlt className="text-3xl text-primary" />
            <h3 className="text-2xl font-bold">Document</h3>
          </div>

          <div className="space-y-3 text-sm">
            <p className="flex justify-between">
              <span>Any Weight (Within City)</span>
              <span className="font-bold">৳60</span>
            </p>
            <p className="flex justify-between">
              <span>Any Weight (Outside City)</span>
              <span className="font-bold">৳80</span>
            </p>
          </div>
        </div>

        {/* Non-Document */}
        <div className="bg-base-100 shadow rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaBox className="text-3xl text-primary" />
            <h3 className="text-2xl font-bold">Non-Document</h3>
          </div>

          <div className="space-y-3 text-sm">
            <p className="flex justify-between">
              <span>Up to 3kg (Within City)</span>
              <span className="font-bold">৳110</span>
            </p>
            <p className="flex justify-between">
              <span>Up to 3kg (Outside City)</span>
              <span className="font-bold">৳150</span>
            </p>

            <hr />

            <p className="text-gray-500">Above 3kg:</p>
            <p className="flex justify-between">
              <span>Additional per kg</span>
              <span className="font-bold">+৳40 / kg</span>
            </p>
            <p className="flex justify-between">
              <span>Extra charge (Outside City)</span>
              <span className="font-bold">+৳40</span>
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Visual Summary Table */}
      <div className="bg-base-100 shadow rounded-xl overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Parcel Type</th>
              <th>Weight</th>
              <th>
                <FaCity className="inline mr-1" /> Within City
              </th>
              <th>
                <FaTruck className="inline mr-1" /> Outside City
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="font-semibold">Document</td>
              <td>Any</td>
              <td>৳60</td>
              <td>৳80</td>
            </tr>

            <tr>
              <td className="font-semibold">Non-Document</td>
              <td>Up to 3kg</td>
              <td>৳110</td>
              <td>৳150</td>
            </tr>

            <tr>
              <td className="font-semibold">Non-Document</td>
              <td>Above 3kg</td>
              <td>+৳40 / kg</td>
              <td>+৳40 / kg + ৳40</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 🔹 Notes */}
      <div className="mt-8 bg-info/10 border border-info rounded-xl p-5 text-sm">
        <h4 className="font-bold mb-2">Important Notes</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Weight is rounded up to the nearest kg</li>
          <li>Extra ৳40 applies only for outside city deliveries</li>
          <li>Pricing may vary during campaigns or offers</li>
        </ul>
      </div>
    </div>
  );
};

export default Pricing;
