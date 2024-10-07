/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUsersData from "../hooks/useUsersData/useUsersData";



const PrivateRoute = ({children}) => {

    const {loading} = useAuth();
    const [verifiedUser]  = useUsersData();
    const location = useLocation()

    if(loading) return <h1>.....</h1>

    if(verifiedUser) return children;

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;