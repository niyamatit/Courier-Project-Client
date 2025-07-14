
import { useForm } from 'react-hook-form';
import axiosSecure from '../../../api/axiosSecure';
import { useQuery } from '@tanstack/react-query';
import useUsersData from '../../../hooks/useUsersData/useUsersData';
import Swal from 'sweetalert2';

const Notice = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [verifiedUser] = useUsersData();

  // Fetch notices using React Query
  const {
    data: notices = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['notices', verifiedUser?.email],
    queryFn: async () => {
      if (!verifiedUser?.email) return [];
      const res = await axiosSecure.get('/notices');
      return res.data;
    },
    enabled: !!verifiedUser?.email,
  });

  // Handle Add Notice
  const onSubmit = async (data) => {
    try {
      await axiosSecure.post('/notices', {
        message: data.message,
        date: new Date().toISOString(),
      });
      reset();
      refetch();
      Swal.fire('Success', 'Notice added successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to add notice', 'error');
    }
  };

  // Handle Delete Notice
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this notice?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/notices/${id}`);
        refetch();
        Swal.fire('Deleted!', 'Notice has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error', 'Failed to delete notice', 'error');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6 border-b pb-2">📢 Notice Board</h1>

      {/* Notice Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-blue-50 p-4 rounded-lg">
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium text-gray-700 mb-1">
            Write Notice
          </label>
          <textarea
            id="message"
            {...register('message', { required: 'Message is required' })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Type your notice message..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={notices.length > 0}
        >
          ➕ Add Notice
        </button>
      </form>

      {/* Notices List */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-gray-600 text-center">Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className="text-gray-500 text-center">No notices available</p>
        ) : (
          notices.map((notice) => (
            <div
              key={notice._id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex justify-between items-start shadow-sm"
            >
              <div>
                <p className="text-gray-800 text-base">{notice.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Posted on {new Date(notice.date).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(notice._id)}
                className="text-red-500 hover:text-red-700 transition"
                aria-label="Delete notice"
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

export default Notice;
