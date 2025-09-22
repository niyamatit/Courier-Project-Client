import { useQuery } from "@tanstack/react-query"
import RiderDataRow from "../../../../Table/RiderDataRow"
import { getAllUsers } from "../../../../api/auth"
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";



const RiderList = () => {
const [verifiedUser] = useUsersData();
    const { data: My_Rider, } = useQuery({
        queryKey: ['My_Rider', verifiedUser?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/rider/hgfhdsfghdfkfdgfhdhfdhhdgf/${verifiedUser?.name}`);
            return response.data;
        },
    });
      

  return (
    <>
      
    </>
  )
}

export default RiderList