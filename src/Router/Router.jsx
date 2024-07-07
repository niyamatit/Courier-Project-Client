import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../LayOuts/MainLayout";
import Home from "../Components/Pages/Home/Home/Home";
import ErrorPage from "../ErrorPage/ErrorPage";
import SignUp from "../SignUp/SignUp";
import Login from "../LogIn/LogIn";
import DashboardLayout from "../LayOuts/DashBoardLayout";
import Profile from "../Components/Common/Profile";
import CreatePackage from "../Components/DashBoard/Host/CreatePackage/CreatePackage";
import DeliverySchedule from "../Components/DashBoard/Host/DeliverySchedule/DeliverySchedule";
import ManageUsers from "../Components/DashBoard/Admin/ManageUsers";
import OnlineBookings from "../Components/Pages/Home/OnlineBooking/OnlineBookings";
import MyBookings from "../Components/DashBoard/Guest/MyBookings";
import OnlineSchedule from "../Components/DashBoard/Host/OnlineSchedule/OnlineSchedule";
import PrivateRoute from "./PrivateRoute";
import HostRoute from "./HostRoute";
import AdminRoute from "./AdminRoute";
import Contact from "../Components/Pages/Home/Contact/Contact";
import AdminStatistics from "../Components/DashBoard/Admin/Statistics";
import About from "../Components/Pages/Home/About/About";
import PackageTracking from "../Components/Pages/Home/PackageTracking/PackageTracking";
import OnlineTracking from "../Components/Pages/Home/OnlineBookedTracking/OnlineTracking";
// import ProductTracking from "../Components/Pages/Home/PackageTracking/ProductTracking";
// import Tracking1 from "../Components/Pages/Home/WorkForce/UserPackageTracking/Tracking1";


export const router = createBrowserRouter([


    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/tracking",
                element: <PackageTracking />
            },
            {
                path: "/online-tracking",
                element: <OnlineTracking/>
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/online-booking",
                element: <PrivateRoute><OnlineBookings /></PrivateRoute>
            },


        ]
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/login",
        element: <Login />
    },

    {
        path: "/dashboard",
        element:
            <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>
        ,
        children: [

            {
                path: "profile",
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: "create-package",
                element: <PrivateRoute>
                    <HostRoute>
                        <CreatePackage />
                    </HostRoute>
                </PrivateRoute>
            },
            {
                path: "delivery-scheduling",
                element: <PrivateRoute>
                    <HostRoute>
                        <DeliverySchedule />
                    </HostRoute>
                </PrivateRoute>
            }
            ,
            {
                path: "online-scheduling",
                element: <PrivateRoute>
                    <HostRoute>
                        <OnlineSchedule />
                    </HostRoute>
                </PrivateRoute>
            }
            ,
            {
                path: "manage-users",
                element: <PrivateRoute>
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: "statistics",
                element: <PrivateRoute>
                    <AdminRoute>
                        <AdminStatistics />
                    </AdminRoute>
                </PrivateRoute>
            },
            {
                path: "my-bookings",
                element: <PrivateRoute><MyBookings /></PrivateRoute>
            },

        ]
    }


]);