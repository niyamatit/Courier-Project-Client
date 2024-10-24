import axiosSecure from "../../../../api/axiosSecure";
import TableRow from "./TableRow";
import { useQuery } from "@tanstack/react-query";

const ApplyPending = () => {

    const {  data: pendings = [], isLoading} = useQuery({
        queryKey: ['pendings'],
        queryFn: async() => {
            const res = await axiosSecure.get("/apply");
            return res.data;
           
        }
        
    });

    return (
        <>
        <h1 className="text-2xl font-bold font-rancho text-center text-secondary">Online Booking Schedule</h1>
        <div className='container mx-auto px-4 sm:px-8'>
         
          <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr className="text-lg font-rancho">
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                       Customer Name
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                       Customer Current Address
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Customer Apply For
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Customer Company Name
                      </th>
  
                      {/* <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Receiver Contact No
                      </th> */}
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Customer Contact Number
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                      {/* User data table row */}
                      {pendings &&
                      pendings.map(pack => (
                        <TableRow
                          key={pack._id}
                          pack={pack}
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

export default ApplyPending;