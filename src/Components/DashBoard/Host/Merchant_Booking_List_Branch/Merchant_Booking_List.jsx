import React from 'react';
import useUsersData from '../../../../hooks/useUsersData/useUsersData';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../../api/axiosSecure';

const Merchant_Booking_List = () => {
    const [verifiedUser] = useUsersData();
  const { data: Merchant_Booking_Parcels = [],refetch } = useQuery({
    queryKey: ['merchant-booking-parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/merchants/branch/${verifiedUser?.name}`);
      return res.data;
    }
  })
    return (
        <div>
            <h1 className="text-3xl text-center mt-10 font-bold">My Merchants Booking List {Merchant_Booking_Parcels.length}</h1>
        </div>
    );
};

export default Merchant_Booking_List;