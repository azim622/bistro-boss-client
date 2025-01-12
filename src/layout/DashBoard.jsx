import React from "react";
import { FaAd, FaBook, FaHome, FaList, FaPhone, FaShoppingCart, FaUtensils, FaUtensilSpoon } from "react-icons/fa";
import { FaAddressBook, FaCalendar, FaMarsAndVenus, FaUsers } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { SiFacebookgaming } from "react-icons/si";
import { NavLink, Outlet } from "react-router-dom";
import UseCart from "../hooks/UseCart";
import UseAdmin from "../hooks/UseAdmin";

const DashBoard = () => {
  const [cart] = UseCart();
  const [isAdmin] = UseAdmin();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu">
          {isAdmin ? (
            <>
               <li>
            <NavLink to="/dashBoard/adminHome">
            <FaHome></FaHome>
           Admin Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashBoard/addItems">
            <FaUtensils></FaUtensils>
            Add Items</NavLink>
          </li>
          <li>
            <NavLink to="/dashBoard/manageItems">
            <FaList></FaList>
            Manage Items</NavLink>
          </li>
          <li>
            <NavLink to="/dashBoard/manageBookings">
            <FaBook></FaBook>
            Manage Booking</NavLink>
          </li>
          <li>
            <NavLink to="/dashBoard/allUser">
            <FaUsers></FaUsers>
            All User</NavLink>
          </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashBoard/userHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashBoard/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart ({cart.length}){" "}
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashBoard/reservation">
                  <FaCalendar></FaCalendar>
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashBoard/review">
                  <FaAddressBook></FaAddressBook>
                  My Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashBoard/paymentHistory">
                  <SiFacebookgaming></SiFacebookgaming>
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          {/* user  */}
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/oder/salad">
              <IoMdMenu />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/oder/contract">
              <FaPhone></FaPhone>
              Contract
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
