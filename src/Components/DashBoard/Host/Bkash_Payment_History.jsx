import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";
import useUsersData from "../../../hooks/useUsersData/useUsersData";


const Bkash_Payment_History = () => {
    const [verifiedUser] = useUsersData();
     const { data: Payment_History = [] } = useQuery({
    queryKey: ['Payment_History'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bkash/${verifiedUser?.email}`);
      return res.data;
    }
  });
    return (
        <div>
            <h1>jkhhhhhh</h1>
        </div>
    );
};

export default Bkash_Payment_History;