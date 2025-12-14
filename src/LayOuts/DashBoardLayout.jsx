import { Link, Outlet } from "react-router-dom"
import Sidebar from "../Components/DashBoard/SideBar/SideBar"
import useUsersData from "../hooks/useUsersData/useUsersData";
import axiosSecure from "../api/axiosSecure";
import { useQuery } from "@tanstack/react-query";


const DashboardLayout = () => {
  const [verifiedUser] =  useUsersData();
  // const [verifiedUser] =  useUsersData();
  const { data: Branches = [], isLoading } = useQuery({
    queryKey: ['Branches'],
    queryFn: async () => {
      const res = await axiosSecure.get("/vgfsdhfsdhhsxgcfbxcjkxnbnj454557");
      return res.data;
    }
  });

  const currentBranch = Branches.find(branch => branch?.email === verifiedUser?.email);

  const isSuspendedBranch =
    verifiedUser?.role === 'host' &&
    (currentBranch?.status === 'suspend' || currentBranch?.status === 'server-off');

  if (isLoading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading dashboard...</div>;
  }

  if (isSuspendedBranch) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <div>
          <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
          
          {
            currentBranch?.status === 'suspend' ? (
              <p className="text-lg mt-2">Your are <strong className="text-red-500">Suspended</strong>.</p>
            ) : (
              <p className="text-lg mt-2">Now <strong className="text-red-600">Server Off</strong>. Please try again later.</p>
            )
          }
         
          <Link to="/"><p className="text-green-500">Back to Home</p></Link>
        </div>
      </div>
    );
  }


    return (
      <div className='relative min-h-screen md:flex'>
        {/* Sidebar Component */}
        <Sidebar></Sidebar>
        <div className='flex-1  md:ml-64'>
          <div className='p-5'>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    )
  }
  
  export default DashboardLayout