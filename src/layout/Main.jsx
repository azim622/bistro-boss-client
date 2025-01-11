import { Outlet, useLocation } from "react-router-dom";
import Footer from "../shared/footer/Footer";
import Navbar from "../pages/navbar/Navbar";

const Main = () => {
  const location = useLocation();
  const noHeaderFooter =  location.pathname.includes("login") || location.pathname.includes("signUp");
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;