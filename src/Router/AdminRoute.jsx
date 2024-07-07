/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";



const AdminRoute = ({children}) => {

    const [role, isLoading] = useRole();

    if( isLoading) return <p>..</p>

    if(role === 'admin') return children;

    return <Navigate to='/dashboard' replace></Navigate>
};

export default AdminRoute;