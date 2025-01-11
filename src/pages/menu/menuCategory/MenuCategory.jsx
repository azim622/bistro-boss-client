import React from "react";
import MenuItems from "../../../shared/menuitem/MenuItems";
import Cover from "../../../shared/cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, coverImg }) => {
  return (
    <div className="pt-8">
      {title && <Cover img={coverImg} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-4 my-16">
        {items.map((item) => (
          <MenuItems key={item._id} item={item}></MenuItems>
        ))}
      </div>
      <Link to={`/order/${title}`}>
      <button className="btn btn-neutral text-white border-0 border-b-4">
        Read More
      </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
