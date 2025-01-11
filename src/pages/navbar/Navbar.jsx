import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { FaCartShopping } from "react-icons/fa6";
import UseCart from "../../hooks/UseCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = UseCart()

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Our Menu</Link>
      </li>
      <li>
        <Link to="/order/salad">Order</Link>
      </li>
      <li>
        <Link to="/secret">Secret</Link>
      </li>
      <li>
        <Link to="/dashboard/cart">
          <button className="btn">
          <FaCartShopping />
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li>

      {user ? (
        <>
          <div className="flex items-center gap-3">
            {/* <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            /> */}
            {/* <span className="text-sm font-semibold">{user.displayName}</span> */}
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-error btn-sm ml-2"
            >
              LogOut
            </button>
          </div>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">LogIn</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-opacity-90 bg-black text-white fixed z-10 w-full shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Bistro Boss
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/cart" className="btn btn-outline btn-warning">
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
