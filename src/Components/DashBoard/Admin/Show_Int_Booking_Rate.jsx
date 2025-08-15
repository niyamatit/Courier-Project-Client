import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import axiosSecure from "../../../api/axiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function Show_Int_Booking_Rate() {
 const {  data: BranchesForRate_Int = [] , refetch} = useQuery({
        queryKey: ['BranchesForRate_Int'],
        queryFn: async() => {
            const res = await axiosSecure.get("/rate");
            return res.data;
        }

    });


  return (
    <div></div>
  );
}