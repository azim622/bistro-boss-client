import React from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxios();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <SectionTitle
        heading="payment history"
        subHeading="Payment List"
      ></SectionTitle>
      <div>
        <h2 className="text-2xl">Total payment: {payments.length}</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Price</th>
                <th>TransactionId</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment , index) => (
                <tr key={payment._id} className="bg-base-200">
                  <th>{index+1}</th>
                  <td>$ {payment.price}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
