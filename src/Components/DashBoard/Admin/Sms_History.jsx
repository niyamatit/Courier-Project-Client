import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../api/axiosSecure";


const Sms_History = () => {
    const { data: SMS_History = [],refetch: refetchUsers } = useQuery({
    queryKey: ['SMS_History'],
    queryFn: async () => {
      const res = await axiosSecure.get("/sms");
      return res.data;
    }
  })
    return (
        <div>
            <h1>SMS History</h1>
        </div>
    );
};

export default Sms_History;