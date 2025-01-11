import React from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import Category from "../../home/category/Category";
import UseAxios from "../../../hooks/UseAxios";
import Swal from "sweetalert2";

const image_hosting_key =import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
  const { register, handleSubmit , reset } = useForm();
  const axiosPublic = UseAxiosPublic()
  const axiosSecure = UseAxios()
  const onSubmit = async(data) => {
    console.log(data);
//   image upload to imagebb and get an url
  const imageFile = {image : data.image[0]}
  const res = await axiosPublic.post(image_hosting_api , imageFile ,{
    headers:{
        'content-type' : 'multipart/form-data'
    }
  })
  if(res.data.success){
    // sent the menuitem  data to the  server with the image Url
    const menuItem = {
        name : data.name,
        Category: data.category,
        price : parseFloat(data.price),
        recipe: data.recipe,
        image : res.data.data.display_url

    }
    // 
    const menuRes = await axiosSecure.post('/menu' , menuItem)
    console.log(menuRes.data)
    if(menuRes.data.insertedId){
        reset()
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${data.name}Successfully added Items`,
            showConfirmButton: false,
            timer: 1500
          });
    }
  }
  console.log(res.data)
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <SectionTitle
        heading="Add an Item"
        subHeading="What's New"
      ></SectionTitle>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Recipe Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Name*
          </label>
          <input
            type="text"
            {...register("name", {required:true})}
            required
            placeholder="Recipe Name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Category and Price */}
        <div className="flex gap-6">
          {/* Category */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category*
            </label>
            <select defaultValue="default"
              {...register("category", {required:true})}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select a category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="dessert">Dessert</option>
              <option value="soup">Soup</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price*
            </label>
            <input
              type="number"
              {...register("price", {required:true})}
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Recipe Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Details
          </label>
          <textarea
            {...register("recipe")}
            className="textarea textarea-bordered w-full h-24"
            placeholder="Write detailed recipe information here..."
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            {...register("image", {required:true})}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-left">
          <button
            type="submit"
            className="btn bg-orange-500"
          >
            Add Item <FaUtensils className="ml-4"></FaUtensils>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItems;
