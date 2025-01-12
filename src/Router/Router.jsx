import { createBrowserRouter } from "react-router-dom";
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

import MerchantDashboard from "../Components/DashBoard/Merchant/MerchatDashboard/MerchantDashboard";
import MerchantAddPercel from "../Components/DashBoard/Merchant/MerchantAddPercel/MerchantAddPercel";
import RiderHome from "../Components/DashBoard/Rider/RiderHome";
import PickupparcelList from "../Components/DashBoard/Rider/PickupparcelList";
import DeliveryparcelList from "../Components/DashBoard/Rider/DeliveryparcelList";
import DeliveryComplete from "../Components/DashBoard/Rider/DeliveryComplete";
import ReturnPercel from "../Components/DashBoard/Rider/ReturnPercel";
import HostDashboard from "../Components/DashBoard/Host/HostDashboard/HostDashboard";

import MerchantDeliveries from "../Components/DashBoard/Merchant/MerchantDeliveries/MerchantDeliveries";
import MerchantInvoices from "../Components/DashBoard/Merchant/MerchantInvoices/MerchantInvoices";
import MerchantInterNationalAddParcel from "../Components/DashBoard/Merchant/MerchantInterNationalAddParcel/MerchantInterNationalAddParcel";
import Apply from "../Components/Pages/Home/Apply/Apply";
import MerchantShopList from "../Components/DashBoard/Merchant/MerchantShopList/MerchantShopList";
import CreateStore from "../Components/DashBoard/Merchant/MerchantShopList/CreateStore";
import DemoPackage from "../Components/DashBoard/Host/CreatePackage/DemoPackage";
import RiderList from "../Components/DashBoard/Host/RiderList/RiderList";
import MerchantList from "../Components/DashBoard/Host/MerchantList/MerchantList";
import PickupParcel from "../Components/DashBoard/Host/Pickup Parcel/PickupParcel";
import ManageAdmin from "../Components/DashBoard/SuperAdmin/ManageAdmin";
import RiderParcel from "../Components/DashBoard/Host/RiderParcelList/RiderParcel";
import ReturnParcel from "../Components/DashBoard/Host/ReturnParcelList/ReturnParcel";
import DeliveryBranchList from "../Components/DashBoard/Host/DeliveryBranchList/DeliveryBranchList";
import PickUpProcessing from "../Components/DashBoard/Host/PickUpProcessing/PickUpProcessing";
import DeliveryParcelList from "../Components/DashBoard/Host/DeliveryParcleList/DeliveryParcleList";
import PendingParcelList from "../Components/DashBoard/Host/PendingParcelList/PendingPacelList";
import ReceivedBranchList from "../Components/DashBoard/Host/ReceivedBranchList/ReceivedBranchList";
import CompleteDeliveryPayment from "../Components/DashBoard/Host/CompleteDeliveryPayment/CompleteDeliveryPayment";
import RiderAllParcelList from "../Components/DashBoard/Host/RiderAllParcelList/RiderAllParcelList";
import BookingForm from "../Components/DashBoard/Host/CreatePackage/BookingForm/BookingForm";
import PendingPayment from "../Components/DashBoard/Host/PendingPayment/PendingPayment";
import Payment from "../Components/DashBoard/Rider/Payment";
import Rideradd from "../Components/DashBoard/Admin/RiderAdd/Rideradd";

import OfflineBookingList from "../Components/DashBoard/Host/OfflineBookingList/OfflineBookingList";
import OnlineBookingHome from "../Components/Pages/OnlineBookingHome/OnlineBookingHome";
import AddBaranchStaff from "../Components/DashBoard/Host/AddBaranchStaff/AddBaranchStaff";
import BranchAdd from "../Components/DashBoard/Admin/BranchAdd/BranchAdd";
import RechargeApply from "../Components/DashBoard/Host/Recharge/RechargeApply/RechargeApply";
import RechargeComplete from "../Components/DashBoard/Host/Recharge/RechargeComplete/RechargeComplete";
import MerchantLogin from "../LogIn/MerchantLogin/MerchantLogin";
import MerchantSignup from "../SignUp/MerchantSignup/MerchantSignup";
import AllRider from "../Components/DashBoard/Admin/AllRider/AllRider";

import ApplyPending from "../Components/DashBoard/Admin/ApplyPending/ApplyPending";

import RechargeProcessign from "../Components/DashBoard/Host/Recharge/RechargeProcessign/RechargeProcessign";
import AllMerchantList from "../Components/DashBoard/Merchant/AllMerchnatList/AllMerchantList";
import RechargeHistory from "../Components/DashBoard/Host/Recharge/RechargeHistory/RechargeHistory";
import BookingInfo from "../Components/DashBoard/Host/CreatePackage/BranchBookinginfo/BookingInfo/BookingInfo";
import MerchantPercelView from "../Components/DashBoard/Merchant/MerchantPercelView/MerchantPercelView";
import MerchantParcelList from "../Components/DashBoard/Merchant/MerchantParcelList/MerchantParcelList";
import AllBranch from "../Components/DashBoard/Admin/AllBranch/AllBranch";
import OfflineBookingShow from "../Components/OfflineBookingShow/OfflineBookingShow";
import AllMerchantListsup from "../Components/DashBoard/SuperAdmin/AllMerchantListsup/AllMerchantListsup";
import AllBranchListsup from "../Components/DashBoard/SuperAdmin/AllBranchListsup/AllBranchListsup";
import FormComponent from "../Components/DashBoard/SuperAdmin/FormComponent/FormComponent";
import AllAdminList from "../Components/DashBoard/SuperAdmin/AllAdminList/AllAdminList";
import SelectMotherHub from "../Components/DashBoard/Host/SelectMotherHub/SelectMotherHub";
import SelectMotherHub_Offline from "../Components/DashBoard/Host/SelectMotherHub/SelectMotherHub_Offline";




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
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/tracking",
        element: <PackageTracking />,
      },
      {
        path: "/online-tracking",
        element: <OnlineTracking />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/online-booking",
        element: (

          <OnlineBookingHome />

        ),
      },
      {
        path: "/apply",
        element: (

          <Apply />

        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/merchantSignup",
    element: <MerchantSignup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/merchantLogin",
    element: <MerchantLogin />,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "branch-booking",
        element: (
          <PrivateRoute>
            <HostRoute>
              <CreatePackage />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "booking-form",
        element: (
          <PrivateRoute>
            <HostRoute>
              <BookingForm />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "apply-pending",
        element: (
          <PrivateRoute>

            <ApplyPending />

          </PrivateRoute>
        ),
      },

      {
        path: "demo-pack",
        element: (
          <PrivateRoute>
            <HostRoute>
              <DemoPackage />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "rider-list",
        element: (
          <PrivateRoute>
            <HostRoute>
              <RiderList />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "merchant-list",
        element: (
          <PrivateRoute>
            <HostRoute>
              <MerchantList />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "pickup-parcel",
        element: (
          <PrivateRoute>
            <HostRoute>
              <PickupParcel />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "host-dashboard",
        element: (
          <PrivateRoute>
            <HostRoute>
              <HostDashboard />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "delivery-scheduling",
        element: (
          <PrivateRoute>
            <HostRoute>
              <DeliverySchedule />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "online-scheduling",
        element: (
          <PrivateRoute>
            <HostRoute>
              <OnlineSchedule />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "offline-booking-list",
        element: (
          <PrivateRoute>
            <HostRoute>
              <OfflineBookingList />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "pending-payment",
        element: (
          <PrivateRoute>
            <HostRoute>
              <PendingPayment />
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminStatistics />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "AllMerchnatList",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllMerchantList />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-branch",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllBranch></AllBranch>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "MerchantDashboard",
        element: <MerchantDashboard />,
      },
      {
        path: "MerchantAddPercel",
        element: <MerchantAddPercel />,
      },
      {
        path: "MerchantInterNationalAddPercel",
        element: <MerchantInterNationalAddParcel />,
      },
      {
        path: "MerchantDeliveries",
        element: <MerchantDeliveries />,
      },
      {
        path: "MerchantInvoices",
        element: <MerchantInvoices />,
      },
      {
        path: "MerchantShopList",
        element: <MerchantShopList />,
      },
      {
        path: "MerchantParcelList",
        element: <MerchantParcelList />,
      },
      {
        path: "CreateStore",
        element: <CreateStore />,
      },

      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },

      // Rider Dashboard
      {
        path: "rider-home",
        element: (
          <PrivateRoute>
            <RiderHome></RiderHome>
          </PrivateRoute>
        ),
      },
      {
        path: "pickup-list",
        element: (
          <PrivateRoute>
            <PickupparcelList></PickupparcelList>
          </PrivateRoute>
        ),
      },
      {
        path: "delivery-list",
        element: (
          <PrivateRoute>
            <DeliveryparcelList></DeliveryparcelList>
          </PrivateRoute>
        ),
      },
      {
        path: "delivery-complete",
        element: (
          <PrivateRoute>
            <DeliveryComplete></DeliveryComplete>
          </PrivateRoute>
        ),
      },
      {
        path: "return-parcel",
        element: (
          <PrivateRoute>
            <ReturnPercel></ReturnPercel>
          </PrivateRoute>
        ),
      },

      {
        path: "demo-pack",
        element: <PrivateRoute>
          <HostRoute>
            <DemoPackage />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "rider-list",
        element: <PrivateRoute>
          <HostRoute>
            <RiderList />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "merchant-list",
        element: <PrivateRoute>
          <HostRoute>
            <MerchantList />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "pickup-parcel",
        element: <PrivateRoute>
          <HostRoute>
            <PickupParcel />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "pickup-processing",
        element: <PrivateRoute>
          <HostRoute>
            <PickUpProcessing />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "pending-parcel-list",
        element: <PrivateRoute>
          <HostRoute>
            <PendingParcelList />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "parcel-admin-received",
        element: <PrivateRoute>
          <HostRoute>
            <SelectMotherHub />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "parcel-motherHub-Select-Offline",
        element: <PrivateRoute>
          <HostRoute>
            <SelectMotherHub_Offline/>
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "received-branch",
        element: <PrivateRoute>
          <HostRoute>
            <ReceivedBranchList />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "rider-parcel-list",
        element: <PrivateRoute>
          <HostRoute>
            <RiderAllParcelList />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "delivery-payment",
        element: <PrivateRoute>
          <HostRoute>
            <CompleteDeliveryPayment />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "delivery-parcel-list",
        element: <PrivateRoute>
          <HostRoute>
            <DeliveryParcelList />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "delivery-branch",
        element: <PrivateRoute>
          <HostRoute>
            <DeliveryBranchList />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "return-parcel",
        element: <PrivateRoute>
          <HostRoute>
            <ReturnParcel />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "rider-parcel",
        element: <PrivateRoute>
          <HostRoute>
            <RiderParcel />
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
        path: "MerchantDeliveries",
        element: <MerchantDeliveries />
      },
      {
        path: "MerchantInvoices",
        element: <MerchantInvoices />
      },
      // Rider Dashboard
      {
        path: "rider-home",
        element: (
          <PrivateRoute>
            <RiderHome></RiderHome>
          </PrivateRoute>
        ),
      },
      {
        path: "pickup-list",
        element: (
          <PrivateRoute>
            <PickupparcelList></PickupparcelList>
          </PrivateRoute>
        ),
      },
      {
        path: "delivery-list",
        element: (
          <PrivateRoute>
            <DeliveryparcelList></DeliveryparcelList>
          </PrivateRoute>
        ),
      },
      {
        path: "delivery-complete",
        element: (
          <PrivateRoute>
            <DeliveryComplete></DeliveryComplete>
          </PrivateRoute>
        ),
      },
      {
        path: "return-parcel",
        element: (
          <PrivateRoute>
            <ReturnPercel></ReturnPercel>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },

      {
        path: "manage-admin",
        element: <ManageAdmin />,
      },
      {
        path: "rider-add",
        element: <Rideradd></Rideradd>,
      },
      {
        path: "all-rider",
        element: <AllRider></AllRider>,
      },
      {
        path: "branch-staff",
        element: <AddBaranchStaff></AddBaranchStaff>
      },
      {
        path: "branch-add",
        element: <BranchAdd></BranchAdd>
      },
      {
        path: "recharge-apply",
        element: <RechargeApply></RechargeApply>
      },
      {
        path: "recharge-processign",
        element: <RechargeProcessign></RechargeProcessign>
      },
      {
        path: "recharge-complete",
        element: <RechargeComplete></RechargeComplete>
      },
      {
        path: "recharge-history",
        element: <RechargeHistory></RechargeHistory>
      },
      {
        path: "booking-info",
        element: <BookingInfo></BookingInfo>
      },
      {
        path: "offline-booking",
        element: <OfflineBookingShow></OfflineBookingShow>
      },
      {
        path: "merchantbooking-info",
        element: <MerchantPercelView></MerchantPercelView>
      },

      // super admin
      {
        path: "AllMerchnatListsup",
        element: <AllMerchantListsup></AllMerchantListsup>
      },
      {
        path: "all-branchsup",
        element: <AllBranchListsup></AllBranchListsup>
      },
      {
        path: "hash-add",
        element: <FormComponent></FormComponent>
      },
      {
        path: "adminList",
        element: <AllAdminList></AllAdminList>
      },

    ],
  },
]);
