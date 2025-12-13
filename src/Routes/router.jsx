import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import OurServices from "../Pages/Services/OurServices";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "./PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children:[
        {
            path:"/",
            Component: Home,
        },
        {
          path:"/services",
          Component: OurServices,
        },
        {
          path:"/aboutUs",
          Component: AboutUs,
        },
        {
          path:"/coverage",
          Component: Coverage,
        },
        {
          path:"/sendParcel",
          element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
          loader: () => fetch(`./warehouses.json`)
        }
    ]
  },

  {
    path:"/",
    Component: AuthLayout,
    children:[
      {
        path:"login",
        Component: Login,
      },
      {
        path:"register",
        Component: Register,
      }
    ]
  }
]);
