import React from "react";
import { Helmet } from "react-helmet";
import Cover from "../../shared/cover/Cover";
import menuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import MenuCategory from "./menuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div className="bg-gray-50 text-gray-800">
      <Helmet>
        <title>Our Menu || Bistro Boss</title>
      </Helmet>
      {/* Main Cover */}
      <Cover img={menuImg} title="Our Menu" />

      {/* Today's Offer Section */}
      <SectionTitle
        subHeading="Don't Miss"
        heading="Today's Offer"
        className="mt-8"
      />
      <MenuCategory items={offered} className="my-8" />

      {/* Dessert Section */}
      <MenuCategory
        items={dessert}
        title="Dessert"
        coverImg={dessertImg}
        className="my-8"
      />

      {/* Pizza Section */}
      <MenuCategory
        items={pizza}
        title="Pizza"
        coverImg={pizzaImg}
        className="my-8"
      />

      {/* Salad Section */}
      <MenuCategory
        items={salad}
        title="Salad"
        coverImg={saladImg}
        className="my-8"
      />
      {/* soup Section */}
      <MenuCategory
        items={soup}
        title="Soup"
        coverImg={soupImg}
        className="my-8"
      />
    </div>
  );
};

export default Menu;
