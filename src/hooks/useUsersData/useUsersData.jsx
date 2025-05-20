
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";


const useUsersData = () => {

    const UserEmail = (localStorage.getItem('email'))
    // console.log("LOcal Email:",UserEmail)
    
     const {  data: users = [], isLoading,refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
            return res.data;
        }

    });
    const verifiedUser = users.find(user => user?.email === UserEmail)
    // console.log("All Verified user ",verifiedUser)
    // console.log("All Users",users)


    return [verifiedUser, isLoading,refetch]

};

export default useUsersData;