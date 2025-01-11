import { MdDelete } from "react-icons/md";
import UseCart from "../../../hooks/UseCart";
import UseAxios from "../../../hooks/UseAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = UseCart(); // Ensure refetch is returned from the hook
  const axiosSecure = UseAxios();
  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/carts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
              refetch(); // Refresh the cart data
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the item.",
              icon: "error",
            });
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Items: {cart.length}</h2>
        <h2 className="text-3xl font-bold">Total Price: ${totalPrice}</h2>
        {cart.length?
          <Link to="/dashboard/payment">
          <button className="btn btn-primary mt-4 md:mt-0">Pay Now</button>
          
          </Link>:
          <button disabled  className="btn btn-primary mt-4 md:mt-0">Pay Now</button>
        }
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full text-lg">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="py-4 px-6">Number</th>
              <th className="py-4 px-6">Image</th>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6 text-center">{index + 1}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16">
                      <img
                        className="rounded-lg object-cover"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">{item.name}</td>
                <td className="py-4 px-6 text-center">${item.price.toFixed(2)}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-outline btn-error"
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cart.length === 0 && (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold">Your cart is empty!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
