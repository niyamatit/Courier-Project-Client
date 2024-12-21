
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";


const useUsersData = () => {

    const UserEmail = (localStorage.getItem('email'))
    // console.log("LOcal Email:",UserEmail)

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }

    });
    const verifiedUser = users.find(user => user?.email === UserEmail)
    // console.log("All Verified user ",verifiedUser)
    // console.log("All Users",users)


    return [verifiedUser, isLoading]

};

export default useUsersData;