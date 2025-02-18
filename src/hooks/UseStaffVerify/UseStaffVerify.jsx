
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import useUsersData from "../useUsersData/useUsersData";


const UseStaffVerify = () => {
    const deobfuscatePassword = (obfuscatedPassword) => {
        let actualPassword = "";
        for (let i = 0; i < obfuscatedPassword.length; i += 21) {
          actualPassword += obfuscatedPassword[i]; 
        }
        return actualPassword;
      };
    const StaffUserID = (localStorage.getItem('StaffEmail'))
    const StaffPassword = (localStorage.getItem('StaffPassword'))
    // console.log("LOcal Email:",UserEmail)
    const [verifiedUser] = useUsersData();
     const {  data: staffs = [], isLoading} = useQuery({
        queryKey: ['staffs'],
        queryFn: async() => {
            const res = await axiosSecure.get("/staffkdgfdjhksgfjhkdjkjkfhfjk");
            return res.data;
        }

    });
    const verifiedStaff = staffs.find((staff) =>
        staff?.Staff_Branch_Name === verifiedUser?.email &&
        staff?.Staff_User_ID === StaffUserID &&
        deobfuscatePassword(staff?.Staff_Password) === StaffPassword)
    
    


    return [verifiedStaff, isLoading]

};

export default UseStaffVerify;