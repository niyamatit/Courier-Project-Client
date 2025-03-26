import { useQuery } from "@tanstack/react-query";
import { getOffline, getPackage } from "../../../api/auth";


const All_COD_Booking_Admin = () => {
    const {
        data: OnlineBookings = [],
        isLoading,
    } = useQuery({
        queryKey: ['OnlineBookings',],
       
        queryFn: async () => await getPackage(),
       
    });
     const {
            data: OfflineBookings = [],
            isLoading,
        } = useQuery({
            queryKey: ["OfflineBookings"],
          
            queryFn: async () => await getOffline(),
           
        });
    return (
        <div>
         <h1>Hello</h1>   
        </div>
    );
};

export default All_COD_Booking_Admin;