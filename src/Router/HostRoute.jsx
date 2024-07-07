/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";



const HostRoute = ({children}) => {

    const [role, isLoading] = useRole()

    if (isLoading) return <p>...</p>
    if (role === 'host') return children
    return <Navigate to='/dashboard' />
};

export default HostRoute;