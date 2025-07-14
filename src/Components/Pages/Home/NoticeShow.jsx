import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const NoticeShow = () => {
  const { data: notices = [], isLoading, isError } = useQuery({
    queryKey: ['public-notices'],
    queryFn: async () => {
      const res = await axios.get('/notices'); // or full URL
      return res.data;
    },
  });

  if (isLoading || isError || notices.length === 0) {
    // ✅ Hide section completely if loading, error, or no notices
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">📌 Latest Notices</h2>

      <div className="space-y-5">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm"
          >
            <p className="text-gray-800 text-base">{notice.message}</p>
            <p className="text-xs text-gray-500 mt-2 italic">
              Posted on: {new Date(notice.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NoticeShow;
