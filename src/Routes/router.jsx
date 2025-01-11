import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import Order from "../pages/order/Order/Order";
import Login from "../pages/LOgin/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivetRoutes from "./PrivetRoutes.jsx/PrivetRoutes";
import Secret from "../shared/Secret/Secret";
import DashBoard from "../layout/DashBoard";
import Cart from "../pages/DashBoard/Cart/Cart";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import AddItems from "../pages/DashBoard/AddItems/AddItems";
import AdminRoutes from "./PrivetRoutes.jsx/AdminRoutes";
import ManageItems from "../pages/DashBoard/ManageItems/ManageItems";
import UpdateItem from "../pages/DashBoard/UpdateItem/UpdateItem";
import Payment from "../pages/DashBoard/Payment/Payment";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'menu',
            element:<Menu></Menu>
        },
        {
            path:'order/:category',
            element:<Order></Order>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'signUp',
            element:<SignUp></SignUp>
        },
        {
            path:'secret',
            element:<PrivetRoutes><Secret></Secret></PrivetRoutes>
        },
      ]
    },
    {
      path: "dashboard",
      element: <PrivetRoutes><DashBoard></DashBoard></PrivetRoutes>,
      children:[
        {
          path:'cart',
          element:<Cart></Cart>
        },
        {
          path:'payment',
          element:<Payment></Payment>
        },


        // admin routes
        {
          path:'addItems',
          element:<AdminRoutes><AddItems></AddItems></AdminRoutes>
        },
        {
          path:'manageItems',
          element:<AdminRoutes><ManageItems></ManageItems></AdminRoutes>
        },
        {
          path: 'updateItem/:id',
          element: <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
          loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
        },
        {
          path:"allUser",
          element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        }
      ]
    }
  ]);