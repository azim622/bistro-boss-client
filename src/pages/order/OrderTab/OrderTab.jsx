import React from "react";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const OrderTab = ({ items }) => {
  // Function to chunk items array into groups of 6
  const chunkItems = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  // Split items into chunks of 6
  const paginatedItems = chunkItems(items, 6);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        {paginatedItems.map((chunk, index) => (
          <SwiperSlide key={index}>
            <div className="grid md:grid-cols-3 gap-10">
              {chunk.map((item) => (
                <FoodCard key={item._id} item={item}></FoodCard>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OrderTab;
