import { Link } from "react-router-dom";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxios from "../../../hooks/UseAxios";

const ManageItems = () => {
  const [menu , , refetch] = useMenu();
  const axiosSecure = UseAxios()

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/menu/${item._id}`);
          console.log(res.data);
  
          // Check deletedCount instead of deleteCount
          if (res.data.deletedCount > 0) {
            refetch(); // Properly refetch the data
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${item.name} has been deleted successfully`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while deleting the item!"
          });
        }
      }
    });
  };
  
  return (
    <div>
      <SectionTitle
        heading="manage all items"
        subHeading="Hurry Up"
      ></SectionTitle>
      <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td className="text-right">${item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button
                                                className="btn btn-ghost btn-lg bg-orange-500">
                                                <FaEdit className="text-white 
                                        "></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
    
  );
};

export default ManageItems;
