/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

import useUsersData from "../hooks/useUsersData/useUsersData";
import Loader from "../hooks/Loader/Loader";



const PrivateRoute = ({children}) => {

    
    const [verifiedUser,isLoading]  = useUsersData();
    const location = useLocation()

    if(isLoading) return <Loader/>

    if(verifiedUser) return children;

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;