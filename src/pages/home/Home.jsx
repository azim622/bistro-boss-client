import React from "react";
import Banner from "./banner/Banner";
import Category from "./category/Category";
import PopularMenu from "./popularMenu/PopularMenu";
import Featured from "./featured/Featured";
import Testimonials from "./Testimonials/Testimonials";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home || Bistro Boss</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <PopularMenu></PopularMenu>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
