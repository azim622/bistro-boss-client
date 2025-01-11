import React, { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

import UseAxios from "../../hooks/UseAxios";
import UseCart from "../../hooks/UseCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe , _id } = item;
  const navigate = useNavigate()
  const location = useLocation()
  const axiosSecure = UseAxios()
  const [, refetch] = UseCart()

  const {user} = useAuth()

  const handleAddToCart= food=>{
    if(user && user.email){
      console.log(user.email, food)
      const cartItem = {
        menuId: _id,
        email : user.email,
        name ,
        image,
        price
      }
      axiosSecure.post('/carts', cartItem)
      .then(res =>{
        console.log(res.data)
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500
          });
          //  refetch the item to update the count
          refetch()
        }
      })


    }
    else{
      Swal.fire({
        title: "You are Not Logged In",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!"
      }).then((result) => {
        if (result.isConfirmed) {
          // send the user to the login page
          navigate("/login" , {state:{from:location}})

        }
      });
    }
  }
  return (
    <div className="card bg-white w-96 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-48">
        <img src={image} alt={name} className="object-cover w-full h-full" />
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 text-sm rounded-br-lg">
          ${price}
        </div>
      </figure>
      <div className="card-body p-6">
        <h2 className="card-title text-2xl font-semibold text-gray-800 mb-2">
          {name}
        </h2>
        <p className="text-gray-600 mb-4">{recipe}</p>
        <div className="card-body flex flex-col items-center">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline bg-slate-100 text-black border-0 border-orange-500 border-b-4"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
