import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import axiosSecure from "../../../../api/axiosSecure";


const SelectMotherHub = () => {
    const [verifiedUser] = useUsersData();
  // Amount 
  const { data: Verify_Admin_MotherHub = [] } = useQuery({
    queryKey: ['Verify_Admin_MotherHub', verifiedUser?.email],
    enabled: !!verifiedUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/package/email/${verifiedUser?.email}`);
      return res.data;
    }
  })
  console.log("EMail:",Verify_Admin_MotherHub)
    return (
        <div>
            <h1>{Verify_Admin_MotherHub?.email}</h1>
        </div>
    );
};

export default SelectMotherHub;