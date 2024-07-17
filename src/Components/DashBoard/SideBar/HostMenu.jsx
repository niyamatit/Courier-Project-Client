import { BsHouseAddFill } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { IoHome } from "react-icons/io5";
import {  MdOutlineManageHistory } from "react-icons/md";


const HostMenu = () => {
  return (
    <>
      <MenuItem
        icon={IoHome}
        label='Dashboard'
        address='host-dashboard'
      />

      <MenuItem
        icon={BsHouseAddFill}
        label='Create Package'
        address='create-package'
      />

      {/* <MenuItem
        icon={MdHomeWork}
        label='My Listings'
        address='my-listings'
      /> */}

      <MenuItem
        icon={MdOutlineManageHistory}
        label='Delivery Schedule'
        address='delivery-scheduling'
      />

      <MenuItem
        icon={MdOutlineManageHistory}
        label='Online Schedule'
        address='online-scheduling'
      />
    </>
  );
};

export default HostMenu;