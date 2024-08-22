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
import RiderHome from "../Components/DashBoard/Rider/RiderHome";
import PickupparcelList from "../Components/DashBoard/Rider/PickupparcelList";
import DeliveryparcelList from "../Components/DashBoard/Rider/DeliveryparcelList";
import DeliveryComplete from "../Components/DashBoard/Rider/DeliveryComplete";
import ReturnPercel from "../Components/DashBoard/Rider/ReturnPercel";
import HostDashboard from "../Components/DashBoard/Host/HostDashboard/HostDashboard";
import MerchantDashboard from "../Components/DashBoard/Merchant/MerchatDashboard/MerchantDashboard";
import MerchantAddPercel from "../Components/DashBoard/Merchant/MerchantAddPercel/MerchantAddPercel";
import MerchantDeliveries from "../Components/DashBoard/Merchant/MerchantDeliveries/MerchantDeliveries";
import MerchantInvoices from "../Components/DashBoard/Merchant/MerchantInvoices/MerchantInvoices";
import DemoPackage from "../Components/DashBoard/Host/CreatePackage/DemoPackage";


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
                element: <OnlineTracking />
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
                path: "branch-booking",
                element: <PrivateRoute>
                    <HostRoute>
                        <CreatePackage />
                    </HostRoute>
                </PrivateRoute>
            },
            
            {
                path: "demo-pack",
                element: <PrivateRoute>
                    <HostRoute>
                        <DemoPackage/>
                    </HostRoute>
                </PrivateRoute>
            },
            {
                path: "host-dashboard",
                element: <PrivateRoute>
                    <HostRoute>
                        <HostDashboard />
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
                path: "MerchantDashboard",
                element: <MerchantDashboard />
            },
            {
                path: "MerchantAddPercel",
                element: <MerchantAddPercel />
            },
            {
              path:"MerchantDeliveries",
              element:<MerchantDeliveries/>
            },
            {
               path:"MerchantInvoices",
               element:<MerchantInvoices/>
            },
            
            {
                path: "my-bookings",
                element: <PrivateRoute><MyBookings /></PrivateRoute>
            },

            // Rider Dashboard
            {
                path: "rider-home",
                element: <PrivateRoute><RiderHome></RiderHome></PrivateRoute>
            },
            {
                path: "pickup-list",
                element: <PrivateRoute><PickupparcelList></PickupparcelList></PrivateRoute>
            },
            {
                path: "delivery-list",
                element: <PrivateRoute><DeliveryparcelList></DeliveryparcelList></PrivateRoute>
            },
            {
                path: "delivery-complete",
                element: <PrivateRoute><DeliveryComplete></DeliveryComplete></PrivateRoute>
            },
            {
                path: "return-parcel",
                element: <PrivateRoute><ReturnPercel></ReturnPercel></PrivateRoute>
            },


            // Rider Dashboard
            {
                path: "rider-home",
                element: <PrivateRoute><RiderHome></RiderHome></PrivateRoute>
            },
            {
                path: "pickup-list",
                element: <PrivateRoute><PickupparcelList></PickupparcelList></PrivateRoute>
            },
            {
                path: "delivery-list",
                element: <PrivateRoute><DeliveryparcelList></DeliveryparcelList></PrivateRoute>
            },
            {
                path: "delivery-complete",
                element: <PrivateRoute><DeliveryComplete></DeliveryComplete></PrivateRoute>
            },
            {
                path: "return-parcel",
                element: <PrivateRoute><ReturnPercel></ReturnPercel></PrivateRoute>
            },


        ]
    },






]);