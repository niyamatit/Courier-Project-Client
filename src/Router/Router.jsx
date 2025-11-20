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
import SpoonserAdd from "../Components/DashBoard/Host/Spoonser/SpoonserAdd";
import SelectMotherHub_Offline from "../Components/DashBoard/Host/SelectMotherHub/SelectMotherHub_Offline";
import PendingPareclList_Offline from "../Components/DashBoard/Host/PendingParcelList/PendingPareclList_Offline";
import PickupParcelList_Offline from "../Components/DashBoard/Rider/PickupParcelList_Offline";
import DeliveryComplete_Offline from "../Components/DashBoard/Rider/DeliveryComplete_Offline";
import SelectMotherHub_Merchant from "../Components/DashBoard/Host/SelectMotherHub/SelectMotherHub_Merchant";
// import PendingPacelList from "../Components/DashBoard/Host/PendingParcelList/PendingPacelList";
import Pending_Parcel_List_Merchant from "../Components/DashBoard/Host/PendingParcelList/Pending_Parcel_List_Merchant";
import PickUpParcelList_Merchant from "../Components/DashBoard/Rider/PickUpParcelList_Merchant";
import OnlineBooking_Merchant from "../Components/DashBoard/Host/CreatePackage/OnlineBooking_Merchant";
import BookingForm_Merchant from "../Components/DashBoard/Host/CreatePackage/BookingForm/BookingForm_Merchant";
import Coverage from "../Components/Pages/Home/Coverage/Coverage";
import SupportCompany from "../Components/DashBoard/Admin/SupportCompany/SupportCompany";
import AllSpoonser from "../Components/DashBoard/Host/Spoonser/AllSpoonser";
import SupportCompany_List from "../Components/DashBoard/Admin/SupportCompany/SupportCompany_List";
import AllBranch_Staff from "../Components/DashBoard/Host/AddBaranchStaff/AllBranch_Staff";
import AllReviews from "../Components/Pages/Home/Reviews/AllReviews";
import VerifyStaff from "../Components/DashBoard/Host/AddBaranchStaff/verifyStaff";
import InterNational_Booking_Branch from "../Components/DashBoard/Host/CreatePackage/InterNational_Booking_Branch";
import Merchant_Parcel_List_Online from "../Components/DashBoard/Host/MerchantList/Merchant_Parcel_List_Online";
import Recharge_History from "../Components/DashBoard/Host/Recharge/RechargeComplete/Recharge_History";
import Booking_Info_Admin from "../Components/DashBoard/Host/CreatePackage/BranchBookinginfo/BookingInfo/Booking_Info_Admin";
import All_COD_Booking_Admin from "../Components/DashBoard/Admin/All_COD_Booking_Admin";
import COD_Booking_Branch from "../Components/DashBoard/Host/CreatePackage/COD_Booking_Branch";
import Merchant_recharge_apply from "../Components/DashBoard/Merchant/Merchant_recharge_apply";
import Merchant_balance_history from "../Components/DashBoard/Merchant/MerchantDeliveries/Merchant_balance_history";
import Merchant_Recharge_Pending_Admin from "../Components/DashBoard/Admin/Merchant_Recharge_Pending_Admin";
import InterNational_Booking_Branch_History from "../Components/DashBoard/Host/CreatePackage/InterNational_Booking_Branch_History";
import All_InterNational_Booking from "../Components/DashBoard/Admin/All_InterNational_Booking";
import MotherHub_Select_Parcel_Int from "../Components/Pages/Home/PackageTracking/MotherHub_Select_Parcel_Int";
import Pending_Parecl_List_International from "../Components/Pages/Home/PackageTracking/Pending_Parecl_List_International";
import Pickup_Parcel_Int from "../Components/Pages/Home/PackageTracking/Pickup_Parcel_Int";
import BkashApi from "../Components/DashBoard/Host/BkashApi";
import Bkash_Payment_History from "../Components/DashBoard/Host/Bkash_Payment_History";
import Bkash_Payment_Admin from "../Components/DashBoard/Admin/Bkash_Payment_Admin";
import Notice from "../Components/DashBoard/Admin/Notice";
import Sms_History from "../Components/DashBoard/Admin/Sms_History";
import Add_Costing from "../Components/DashBoard/Admin/AllBranch/Add_Costing";
import Costing_Amount_Add from "../Components/DashBoard/Admin/AllBranch/Costing_Amount_Add";
import Cost_History from "../Components/DashBoard/Admin/AllBranch/Cost_History";
import Booking_Rate_International from "../Components/DashBoard/Admin/Booking_Rate_International";
import Booking_Rate_For_All from "../Components/DashBoard/Admin/Booking_Rate_For_All";
import InterNational_Booking_Branch_Admin from "../Components/DashBoard/Host/CreatePackage/InterNational_Booking_Branch_Admin";




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
        path: "/coverage",
        element: <Coverage />,
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
        path: "branch-booking-merchant",
        element: (
          <PrivateRoute>
            <HostRoute>
              <OnlineBooking_Merchant />
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
        path: "booking-form-merchant",
        element: (
          <PrivateRoute>
            <HostRoute>
              <BookingForm_Merchant />
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
        path: "international-booking",
        element: (
          <PrivateRoute>
            <HostRoute>
              <InterNational_Booking_Branch/>
            </HostRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "international-booking-history",
        element: (
          <PrivateRoute>
            <HostRoute>
              <InterNational_Booking_Branch_History/>
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
        path: "verify-staff",
        element: (
          <PrivateRoute>
            <HostRoute>
              <VerifyStaff/>
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
        path: "int-scheduling",
        element: (
          <PrivateRoute>
            <HostRoute>
              <All_InterNational_Booking/>
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
        path: "recharge-bkash-history-admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Bkash_Payment_Admin/>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-notice",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Notice />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-costing",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Add_Costing/>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-costing-amount",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Costing_Amount_Add />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "cost-history",
        element: (
          <PrivateRoute>
            <AdminRoute>
             <Cost_History/>
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
        path: "Merchant-Recharge-Apply",
        element: (
          <PrivateRoute>
            <AdminRoute>
             <Merchant_Recharge_Pending_Admin/>
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
        path: "add-booking-rate-international",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Booking_Rate_International />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-booking-rate-For-All",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Booking_Rate_For_All/>
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
        path: "Parcel_Online",
        element: <Merchant_Parcel_List_Online/>,
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
        path: "delivery-complete-offline",
        element: (
          <PrivateRoute>
            <DeliveryComplete_Offline />
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
        path: "pending-parcel-list-Offline",
        element: <PrivateRoute>
          <HostRoute>
            <PendingPareclList_Offline />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "pending-parcel-list-Merchant",
        element: <PrivateRoute>
          <HostRoute>
            <Pending_Parcel_List_Merchant />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "pending-parcel-list-int",
        element: <PrivateRoute>
          <HostRoute>
           <Pending_Parecl_List_International/>
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
            <SelectMotherHub_Offline />
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "parcel-motherHub-Select-int",
        element: <PrivateRoute>
          <HostRoute>
            <MotherHub_Select_Parcel_Int/>
          </HostRoute>
        </PrivateRoute>
      },
      {
        path: "parcel-motherHub-Select-Merchant",
        element: <PrivateRoute>
          <HostRoute>
            <SelectMotherHub_Merchant />
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
      },
      {
        path: "cod-booking-branch",
        element: <PrivateRoute>
          <HostRoute>
           <COD_Booking_Branch/>
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
      {
        path: "Bkash-Payment",
        element: <BkashApi />
      },
      {
        path: "Bkash-Payment-history",
        element: <Bkash_Payment_History />
      },
      {
        path: "recharge_apply",
        element: <Merchant_recharge_apply/>
      },
      {
        path: "balance_history",
        element: <Merchant_balance_history/>
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
        path: "pickup-list-Offline",
        element: (
          <PrivateRoute>
            <PickupParcelList_Offline />
          </PrivateRoute>
        ),
      },
      {
        path: "pickup-list-Merchant",
        element: (
          <PrivateRoute>
            <PickUpParcelList_Merchant />
          </PrivateRoute>
        ),
      },
      {
        path: "pickup-list-int",
        element: (
          <PrivateRoute>
           <Pickup_Parcel_Int/>
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
        path: "all-spoonser",
        element: <AllSpoonser></AllSpoonser>
      },
      {
        path: 'all-reviews',
        element: <AllReviews></AllReviews>
      },
      {
        path: "branch-staff",
        element: <AddBaranchStaff></AddBaranchStaff>
      },
      {
        path: "branch-staff-list",
        element: <AllBranch_Staff/>
      },
      {
        path: "spoonser-add",
        element: <SpoonserAdd></SpoonserAdd>
      },
      {
        path: "company-add",
        element: <SupportCompany />
      },
      {
        path: "company-list",
        element: <SupportCompany_List />
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
        path: "recharge-bkash",
        element: <BkashApi/>
      },
      {
        path: "recharge-bkash-history",
        element: <Bkash_Payment_History/>
      },
      {
        path: "recharge-processign",
        element: <RechargeProcessign></RechargeProcessign>
      },
      {
        path: "recharge-complete",
        element: <Recharge_History/>
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
        path: "booking-info-admin",
        element: <Booking_Info_Admin/>
      },
      {
        path: "offline-booking",
        element: <OfflineBookingShow></OfflineBookingShow>
      },
      {
        path: "int-booking",
        element: <InterNational_Booking_Branch_Admin/>
      },
      {
        path: "merchantbooking-info",
        element: <MerchantPercelView></MerchantPercelView>
      },
      {
        path: "all-cod-booking-admin",
        element: <All_COD_Booking_Admin/>
      },
      {
        path: "sms-history",
        element: <Sms_History/>
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
