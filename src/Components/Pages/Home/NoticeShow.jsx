import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUsersData from '../../../hooks/useUsersData/useUsersData';
import axiosSecure from '../../../api/axiosSecure';

const NoticeShow = () => {
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


  if (isLoading  || notices.length === 0) {
    // ✅ Don't render anything if no notices
    return null;
  }

  return (
    <section className="max-w-full mx-auto px-4 py-2">
      

      <div className="space-y-1">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="bg-gray-50 border border-blue-200 rounded-lg p-4 shadow-sm"
          >
            <p className="text-gray-800 text-2xl">📢 {notice.message}</p>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default NoticeShow;
