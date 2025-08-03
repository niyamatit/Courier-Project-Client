import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";


const Cost_History = () => {
    const { data: Cost_History = [] } = useQuery({
    queryKey: ['Cost_History'],
    queryFn: async () => {
      const res = await axiosSecure.get("/cost");
      return res.data;
    }
  });
    return (
        <div>
           <h1>AAA</h1> 
        </div>
    );
};

export default Cost_History;