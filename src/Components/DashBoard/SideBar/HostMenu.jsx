import { BsHouseAddFill } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { IoHome } from "react-icons/io5";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaBiking, FaWpforms } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import useUsersData from "../../../hooks/useUsersData/useUsersData";



const HostMenu = () => {

  const[verifiedUser] = useUsersData()


  return (
    <>
      <p className="text-2xl text-center font-semibold text-secondary">{verifiedUser?.displayName}</p>

      <MenuItem
        icon={IoHome}
        label='Dashboard'
        address='host-dashboard'
      />
      <MenuItem
        icon={IoHome}
        label='Rider Parcel List'
        address='rider-parcel-list'
      />

      <div className="dropdown">
        <div tabIndex={0} role="button" className="w-[200px] items-center flex gap-3  text-center m-1"><BsHouseAddFill className="ml-3" />Pickup Parcel</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><MenuItem
            icon={IoHome}
            label='Pickup Parcel'
            address='pickup-parcel'
          /></li>
          <li>
            <MenuItem
              icon={IoHome}
              label='Assign For Pickup'
              address='rider-parcel'
            /></li>
          <li>
            <MenuItem
              icon={IoHome}
              label='Processing'
              address='pickup-processing'
            /></li>
          <li>
            <MenuItem
              icon={IoHome}
              label='Delivery Branch List'
              address='delivery-branch'
            /></li>
        </ul>
      </div>





      <MenuItem
        icon={IoHome}
        label='Return Parcel'
        address='return-parcel'
      />
      <div className="dropdown">
        <div tabIndex={0} role="button" className="w-[200px] items-center flex gap-3  text-center m-1"><BsHouseAddFill className="ml-3" /> Booking</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><MenuItem
            icon={BsHouseAddFill}
            label='Online Booking'
            address='branch-booking'
          /></li>
          <li><MenuItem
            icon={FaWpforms}
            label='Offline Booking'
            address='booking-form'
          /></li>
          <li><MenuItem
            icon={FaList}
            label='Offline Data List'
            address='offline-booking-list'
          /></li>
        </ul>
      </div>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="w-[200px] items-center flex gap-3  text-center m-1"><BsHouseAddFill className="ml-3" /> Recharge</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><MenuItem
            icon={BsHouseAddFill}
            label='Recharge Apply'
            address='recharge-apply'
          /></li>
          <li><MenuItem
            icon={FaWpforms}
            label='Recharge complete'
            address='recharge-complete'
          /></li>
        </ul>
      </div>




      <MenuItem
        icon={BsHouseAddFill}
        label='International Booking'
        address='demo-pack'
      />



      <MenuItem
        icon={MdOutlineManageHistory}
        label='All Parcel List Offline'
        address='delivery-scheduling'
      />

      <MenuItem
        icon={FaList}
        label='All Parcel List Online'
        address='online-scheduling'
      />
      <div className="dropdown">
        <div tabIndex={0} role="button" className="w-[200px] items-center flex gap-3  text-center m-1"><BsHouseAddFill className="ml-3" />Delivery Parcle List</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><MenuItem
            icon={IoHome}
            label='Delivery Parcel List'
            address='delivery-parcel-list'
          /></li>
          <li>
            <MenuItem
              icon={IoHome}
              label='Pending Parcel List'
              address='pending-parcel-list'
            /></li>
          <li>
            <MenuItem
              icon={IoHome}
              label='Processing'
              address='pickup-processing'
            /></li>
          <li>
            <MenuItem
              icon={IoHome}
              label='Received Branch List'
              address='received-branch'
            /></li>
        </ul>
      </div>
      <MenuItem
        icon={FaMoneyBill}
        label='Complete Delivery Payment'
        address='delivery-payment'
      />
      <MenuItem
        icon={FaMoneyBill}
        label='Pending Payment'
        address='pending-payment'
      />
      {/* <MenuItem
        icon={MdPersonAdd}
        label='Add Staff'
        address='branch-staff'
      /> */}
      <MenuItem
        icon={FaBiking}
        label='Rider List'
        address='rider-list'
      />

      <MenuItem
        icon={MdOutlineManageHistory}
        label='Merchant List'
        address='merchant-list'
      />
    </>
  );
};

export default HostMenu;