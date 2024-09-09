import { useQuery } from "@tanstack/react-query";
import { getAllPackage } from "../../../../api/auth";
import DeliveryRaw from "./DeliveryRaw";




const CompleteDeliveryPayment = () => {

    const { data: packages = [], refetch } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => await getAllPackage(),
      });
      
      // Filter the packages to only include those with the role of 'rider'
      const payments = packages.filter(payment => payment.update === 'delivered');


    return (
        <>
        <div className='container mx-auto px-4 sm:px-8'>
         
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
                        Sender Name
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Receiver Name
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Status
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Amount
                      </th>
  
                     
                    </tr>
                  </thead>
                  <tbody>
                      {/* payment data table row */}
                      {payments &&
                      payments.map(payment => (
                        <DeliveryRaw
                          key={payment._id}
                          payment={payment}
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

export default CompleteDeliveryPayment;