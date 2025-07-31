
import { useForm } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useUsersData from '../../../../hooks/useUsersData/useUsersData';
import axiosSecure from '../../../../api/axiosSecure';

const Add_Costing = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [verifiedUser] = useUsersData();

  // Fetch Costs using React Query
  const {
    data: Costs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['Costs', verifiedUser?.email],
    queryFn: async () => {
      if (!verifiedUser?.email) return [];
      const res = await axiosSecure.get('/Costs');
      return res.data;
    },
    enabled: !!verifiedUser?.email,
  });

  // Handle Add Cost
  const onSubmit = async (data) => {
    try {
      await axiosSecure.post('/cost', {
        message: data.message,
        date: new Date().toISOString(),
      });
      reset();
      refetch();
      Swal.fire('Success', 'Cost added successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to add Cost', 'error');
    }
  };

  // Handle Delete Cost
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this Cost?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/Costs/${id}`);
        refetch();
        Swal.fire('Deleted!', 'Cost has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error', 'Failed to delete Cost', 'error');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6 border-b pb-2">📢 Cost Board</h1>

      {/* Cost Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-blue-50 p-4 rounded-lg">
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium text-gray-700 mb-1">
            Write Cost
          </label>
          <textarea
            id="message"
            {...register('message', { required: 'Message is required' })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Type your Cost message..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
  type="submit"
  className={`px-6 py-2 rounded-lg transition font-medium ${
    Costs.length > 0
      ? 'bg-white text-gray-400 border border-gray-300 cursor-not-allowed'
      : 'bg-blue-600 text-white hover:bg-blue-700'
  }`}
  disabled={Costs.length > 0}
  title={Costs.length > 0 ? 'You already have a Cost' : 'Add a new Cost'}
>
  ➕ Add Cost
</button>

      </form>

      {/* Costs List */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-gray-600 text-center">Loading Costs...</p>
        ) : Costs.length === 0 ? (
          <p className="text-gray-500 text-center">No Costs available</p>
        ) : (
          Costs.map((Cost) => (
            <div
              key={Cost._id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex justify-between items-start shadow-sm"
            >
              <div>
                <p className="text-gray-800 text-base">{Cost.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Posted on {new Date(Cost.date).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(Cost._id)}
                className="text-red-500 hover:text-red-700 transition"
                aria-label="Delete Cost"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Add_Costing;
