
import MenuItem from "./MenuItem";
import { MdAddBox } from "react-icons/md";
import { FaBox } from 'react-icons/fa';
import { IoHomeOutline } from "react-icons/io5";
import { FaTruck } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa';
import { MdStore } from 'react-icons/md';
import { History, Scale, Wallet, CalendarClock, LineChart,CircleDollarSign } from "lucide-react";
import { RiBox3Line } from 'react-icons/ri';

import useUsersData from "../../../hooks/useUsersData/useUsersData";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import { useEffect } from "react";
const MerchantMenu = () => {
  const [verifiedUser] = useUsersData();
  const { data: users = [],refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
      return res.data;
    }
  })
  const { data: parcels = [],refetch: refetchParcels } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/merchanjjfjhjdhj/${verifiedUser?.email}`);
      return res.data;
    }
  })

  useEffect(() => {
    const updateMerchantBalances = async () => {
      if (users.length && parcels.length) {
        for (const merchant of users) {
          const merchantParcels = parcels.filter(parcel => parcel.Merchant_email === merchant?.email);
  
          if (merchantParcels.length === 0) continue;
  
          let balance = parseFloat(merchant?.Merchant_Balance || 0);
  
          for (const parcel of merchantParcels) {
             if (parcel?.Tracking_Rider_Merchant_Delivary_Update_Successful === "Delivery Done" && !parcel?.isProcessed) {
              balance += parseFloat(parcel.Calculate_Charge_Merchant || 0);
            // } else if (parcel?.Tracking_Rider_Merchant_Delivary_Update_Successful === "Delivery Done" && !parcel?.isBalanceUpdated) {
            //   balance += parseFloat(parcel.Calculate_Charge_Merchant || 0);
  
              // Mark the parcel as processed to prevent re-updating
              try {
                await axiosSecure.put(`/parcels/updateBalanceFlag/${parcel._id}`, { isBalanceUpdated: true });
              } catch (error) {
                console.error(`Failed to update balance flag for parcel ${parcel._id}`, error);
              }
            }
          }
  
          try {
            await axiosSecure.put(`/merchants/balance/mer/${merchant?.email}`, { balance });
            // console.log(`Updated balance for ${merchant.email}: ${balance}`);
          } catch (error) {
            console.error(`Failed to update balance for ${merchant.email}`, error);
          }
        }
        refetchUsers();
        refetchParcels();
      }
    };
  
    updateMerchantBalances();
  }, [users, parcels]);
  


  return (
    <>
      <div className="mb-10">
        <p className="     font-semibold ml-5">{verifiedUser?.name} ({verifiedUser?.email})</p>
        
        <p className="text-sm  ml-[45px] font-semibold">Merchant ID- {verifiedUser?.merchantID}</p>
        <p className="text-sm  ml-[45px] font-semibold">Merchant Balance : {verifiedUser?.Merchant_Balance}</p>
      </div>
      <MenuItem
        icon={IoHomeOutline}
        label='Dashboard'
        address='/dashboard/MerchantDashboard'
      />
      <MenuItem
        icon={MdAddBox}
        label='Add Parcel(National)'
        address='/dashboard/MerchantAddPercel'
      />
      <MenuItem
        icon={FaTruck}
        label='Deliveries'
        address='/dashboard/MerchantDeliveries'
      />

      {/* <MenuItem
        icon={MdHomeWork}
        label='My Listings'
        address='my-listings'
      /> */}

      <MenuItem
        icon={FaFileInvoice}
        label='Invoice'
        address='/dashboard/MerchantInvoices'
      />
      <MenuItem
        icon={FaBox}
        label='Add Parcel(International)'
        address='/dashboard/MerchantInterNationalAddPercel'
      />
      <MenuItem
        icon={MdStore}
        label='Shop List'
        address='/dashboard/MerchantShopList'
      />
      <MenuItem
        icon={RiBox3Line}
        label='My Parcel List'
        address='/dashboard/MerchantParcelList'
      />
      <MenuItem
        icon={RiBox3Line}
        label='My Parcel List (Online)'
        address='/dashboard/Parcel_Online'
      />
      <MenuItem
        icon={History}
        label='Balance History'
        address='/dashboard/balance_history'
      />
      <MenuItem
        icon={CircleDollarSign}
        label='Recharge Apply'
        address='/dashboard/recharge_apply'
      />

      {/* <MenuItem
        icon={FaClipboardList}
        label='All Orders'
        address='/'
      />
      <MenuItem
        icon={MdAccountBalance}
        label='Accounts'
        address='/'
      />
      <MenuItem
        icon={FaSearchPlus}
        label='Order Tracking'
        address='/'
      />
      <MenuItem
        icon={FaShareAltSquare}
        label='Coverage Area'
        address='/'
      />
      <MenuItem
        icon={TbCoinTaka}
        label='Service Charge'
        address='/'
      /> */}
    </>
  );
};

export default MerchantMenu;