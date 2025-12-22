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
import DashboardLayout from "../Layouts/DashboardLayout";
import UserParcels from "../Pages/Dashboard/UserParcels";
import PercelDetails from "../Pages/Dashboard/PercelDetails";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import TrackAPackage from "../Pages/Dashboard/TrackParcel";
import TrackParcel from "../Pages/Dashboard/TrackParcel";
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";

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
        },
        {
          path:"/beARider",
          element:<PrivateRoutes><BeARider></BeARider></PrivateRoutes>,
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
  },

  {
    path:"/dashboard",
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children:[
      {
        path:"userParcels",
        Component: UserParcels,
      },
      {
        path: "parcel/:id",
        Component: PercelDetails
      },
      {
        path: "payment/:id",
        Component: Payment
      },
      {
        path:"paymentHistory",
        Component: PaymentHistory,
      },
      {
        path:"track",
        Component:TrackParcel,
      },
      {
        path:"pendingRiders",
        Component: PendingRiders
      },
      {
        path:"activeRiders",
        Component: ActiveRiders,
      },
      {
        path:"makeAdmin",
        Component: MakeAdmin,
      }
      
    ]
  }
]);
