import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../../api/auth";
import MerchantDataRow from "./MerchantDataRow";
import axiosSecure from "../../../../api/axiosSecure";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";


const MerchantList = () => {
  const [verifiedUser] = useUsersData();
  const { data: users = [],refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/shfjksdhfjdjkfhxnbcnbc67437gch`);
      return res.data;
    }
  })
  
      
      // Filter the users to only include those with the role of 'rider'
      const merchants = users.filter(user => 
        
        user.Merchant_Branch === verifiedUser?.name
      );

  
    return (
        <>
        <div className='container mx-auto px-4 sm:px-8'>
         <h1 className="text-3xl text-center mt-10 font-bold">My Merchants</h1>
          <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        SL
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        imageUrl
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Merchant Name
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Email
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Address
                      </th>
                      
  
                     
                    </tr>
                  </thead>
                  <tbody>
                      {/* User data table row */}
                      {merchants &&
                      merchants.map((user , index) => (
                        <MerchantDataRow
                          key={user._id}
                          user={user}
                          index={index}
                          refetch={refetch}
                        />
                      ))}
  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default MerchantList;