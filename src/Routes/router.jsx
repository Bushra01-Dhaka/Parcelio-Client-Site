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
import ForbiddenPage from "../Pages/ForbiddenPage/ForbiddenPage";
import AdminRoutes from "./AdminRoutes";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdatePofile";
import AssignRider from "../Pages/Dashboard/AssignRiders/AssignRider";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import RiderRoutes from "./RiderRoutes";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../Pages/Dashboard/MyEarnings/MyEarnings";

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
        },
        {
          path:"/forbiddenPage",
          Component: ForbiddenPage,

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
        path:"updateProfile",
        Component:UpdateProfile,

      },
      {
        path:"pendingRiders",
        element:<AdminRoutes><PendingRiders></PendingRiders></AdminRoutes>
      },
      {
        path:"activeRiders",
        element:<AdminRoutes><ActiveRiders></ActiveRiders></AdminRoutes>
      },
      {
        path:"makeAdmin",
        element:<AdminRoutes><MakeAdmin></MakeAdmin></AdminRoutes>,
      },
      {
        path:"assign-rider",
        element:<AdminRoutes><AssignRider></AssignRider></AdminRoutes>
      },
      // rider routes
      {
        path:"pending-delivery",
        element:<RiderRoutes><PendingDeliveries></PendingDeliveries></RiderRoutes>
      },
      {
        path:"completed-delivery",
        element:<RiderRoutes><CompletedDeliveries></CompletedDeliveries></RiderRoutes>
      },
      {
        path:'my-earnings',
        element:<RiderRoutes><MyEarnings></MyEarnings></RiderRoutes>
      }
      
    ]
  }
]);
