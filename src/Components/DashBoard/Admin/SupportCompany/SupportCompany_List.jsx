import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api/axiosSecure";
import { FaTrash, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

const SupportCompany_List = () => {
    const { data: SupportCompanyList = [], isLoading, refetch, error } = useQuery({
        queryKey: ["SupportCompanyList"],
        queryFn: async () => {
            const response = await axiosSecure.get("/Company");
            return response.data || [];
        },
    });

    // Delete Handler
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/Company/${id}`);
                    refetch();
                    Swal.fire("Deleted!", "Company has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error!", error.message, "error");
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-center">
                    Error fetching companies: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Supported Companies</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-200">
                        <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                SL
                            </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Date Added
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Company
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Logo
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Office Location
                            </th>
                            
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {SupportCompanyList.map((company,index) => (
                            <tr  key={company._id} className="hover:bg-gray-50 transition-colors">
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {index + 1}
        </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(company.Date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {company.Company_Name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img 
                                        src={company.Company_Logo} 
                                        alt="Company Logo" 
                                        className="h-12 w-12 object-contain rounded-lg"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {company.Company_Number}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {company.Company_Office_Location}
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                                    <button
                                        onClick={() => handleDelete(company._id)}
                                        className="p-2 hover:bg-red-50 rounded-md transition-colors"
                                    >
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupportCompany_List;