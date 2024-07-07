import { BsHouseAddFill } from "react-icons/bs";
import MenuItem from "./MenuItem";
import {  MdOutlineManageHistory } from "react-icons/md";


const HostMenu = () => {
  return (
    <>
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