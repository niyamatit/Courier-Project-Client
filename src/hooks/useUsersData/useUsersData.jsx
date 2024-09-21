
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";


const useUsersData = () => {
    
   
    const {  data: user = [], } = useQuery({
        queryKey: ['user'],
        queryFn: async() => {
            const res = await axiosSecure.get("/users");
            return res.data;
           
        }
        
    })
    console.log("All user ",user)
    return [user]
    
};

export default useUsersData;