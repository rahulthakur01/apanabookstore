import { useFirebase } from "../context/Firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewOrderDetails() {
  const firebase = useFirebase();
  const params = useParams();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  }, []);
  return (
    <div className="container mt-[100px]  ">
      <h1 className="font-bold text-xl text-gray-900">Orders</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-2 flex"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <div className="flex flex-col gap-2">
              <h5 className="font-semibold text-gray-800">
                Order By: {data.displayName}
              </h5>
              <h6 className="font-semibold text-gray-800">
                Quantity: {data.quantity}
              </h6>
              <p className="font-semibold text-gray-800">
                Email: {data.userEmail}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ViewOrderDetails;
