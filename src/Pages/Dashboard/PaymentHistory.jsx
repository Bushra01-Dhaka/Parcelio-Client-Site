import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth"
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const PaymentHistory = () => {

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {isPending, data: payments = []} = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/payments?email=${user?.email}`);
      return res.data;
    }
  })
  if(isPending){
      return '...loading'
  }
  return (
    <div className="p-4">
      {/* Heading */}
      <h2 className="text-4x lg:text-5xl font-bold mb-6 text-secondary pt-10 pb-8">
        💳 Payment History
      </h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Paid On</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No payment history found
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>

                  <td className="font-mono text-xs">
                    {payment.parcelId}
                  </td>

                  <td className="font-mono text-xs text-blue-600">
                    {payment.transactionId}
                  </td>

                  <td className="font-semibold">
                    ৳{payment.amount}
                  </td>

                  <td className="capitalize">
                    {payment.paymentMethod?.[0] || "Card"}
                  </td>

                  <td>
                    {new Date(payment.paid_date).toLocaleDateString()}
                  </td>

                  <td>
                    <span className="badge badge-success badge-outline">
                      Paid
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentHistory