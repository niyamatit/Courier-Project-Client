
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { imageUpload } from '../../../../api/utils';
import axiosSecure from '../../../../api/axiosSecure';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import useUsersData from '../../../../hooks/useUsersData/useUsersData';
import Swal from 'sweetalert2';

const FormComponent = () => {
     const [verifiedUser] = useUsersData();
     const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors }, setValue,reset } = useForm();
const obfuscatePassword = (password) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(()){:}}||><?";
  let obfuscated = "";
  for (let char of password) {
    obfuscated += char; // Add the actual character
    for (let i = 0; i < 20; i++) {
      obfuscated += characters.charAt(Math.floor(Math.random() * characters.length)); // Add 20 random characters
    }
  }
  return obfuscated;
};
    const onSubmit = async (data) => {
  try {
    
    // Upload NID images
    const nidFront = await imageUpload(data.nidFront);
    const nidBack = await imageUpload(data.nidBack);

    const adminInfo = {
      Admin_Number: data?.mobile || "",
      Admin_Name: data?.name || "",
      Admin_Address: data?.address || "",
      Admin_Country: data?.country || "",
      Admin_District_Name: data?.district || "",
      Admin_Area: data?.area || "",
      Admin_Nid: data?.nidNumber || "",
      Admin_User_ID: data?.userId || "",
      Admin_Password: obfuscatePassword(data?.password) || "",
      role: "admin",
      NID_Front_Image: nidFront?.data?.display_url || "",
      NID_Back_Image: nidBack?.data?.display_url || "",
      date: new Date().toISOString().split('T')[0],
      Who_Added: verifiedUser?.email || "",
      Who_Added_Name: verifiedUser?.name || ""
    };

    // Step 1: Create admin info
    const adminRes = await axiosSecure.post("/admin/create", adminInfo);

    // Step 2: Create admin login
    const AdminLogin = {
      name: data?.name || "",
      email: data?.userId || "",
      password: data?.password || "",
      role: "admin",
      imageUrl: "",
    };

    const registerRes = await axiosSecure.post('/users/auth/register', AdminLogin);

    // ✅ If both succeed, show success alert
    if (adminRes.status === 201 && registerRes.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Admin Added!",
        text: "New admin has been successfully created.",
      });
    }
reset()
    // Optionally: reset form, refetch data
    queryClient.invalidateQueries({ queryKey: ['admin'] });
  } catch (error) {
    const status = error.response?.status;
    const errorM= error 
    const message = error.response?.data?.message || "Something went wrong.";

    // Handle duplicate admin or user
    if (status === 409 || status === 401) {
      Swal.fire({
        icon: "warning",
        title: "Already Exists",
        text: message,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: message,
      });
    }

    console.error("Submission error:", errorM);
  }
};


    const handleFileUpload = (event, name) => {
        const file = event.files[0];
        setValue(name, file, { shouldValidate: true });
    };


    return (
        <div className="flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-extrabold  text-blue-500">
        Add New Admin
      </h2>
      
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1">
            <InputText
              id="name"
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Enter full name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
          </div>
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
          <div className="mt-1">
            <InputText
              id="mobile"
              className={`w-full px-3 py-2 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="e.g., 017xxxxxxxx"
              {...register('mobile', { required: 'Mobile number is required' })}
            />
            {errors.mobile && <p className="mt-2 text-sm text-red-600">{errors.mobile.message}</p>}
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <div className="mt-1">
            <InputText
              id="country"
              className={`w-full px-3 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Country Name"
              {...register('country', { required: 'Country is required' })}
            />
            {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country.message}</p>}
          </div>
        </div>
        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <div className="mt-1">
            <InputText
              id="address"
              className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Street, City"
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
          </div>
        </div>

        {/* District */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
          <div className="mt-1">
            <InputText
              id="district"
              className={`w-full px-3 py-2 border ${errors.district ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="e.g., Dhaka"
              {...register('district', { required: 'District is required' })}
            />
            {errors.district && <p className="mt-2 text-sm text-red-600">{errors.district.message}</p>}
          </div>
        </div>

        {/* Area */}
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
          <div className="mt-1">
            <InputText
              id="area"
              className={`w-full px-3 py-2 border ${errors.area ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="e.g., Gulshan"
              {...register('area', { required: 'Area is required' })}
            />
            {errors.area && <p className="mt-2 text-sm text-red-600">{errors.area.message}</p>}
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <Password
              id="password"
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Enter a strong password"
              toggleMask
              onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
          </div>
        </div>

        {/* UserID */}
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">UserID</label>
          <div className="mt-1">
            <InputText
              id="userId"
              className={`w-full px-3 py-2 border ${errors.userId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="Enter unique user ID"
              {...register('userId', { required: 'UserID is required' })}
            />
            {errors.userId && <p className="mt-2 text-sm text-red-600">{errors.userId.message}</p>}
          </div>
        </div>

        {/* NID Number */}
        <div>
          <label htmlFor="nidNumber" className="block text-sm font-medium text-gray-700">NID Number</label>
          <div className="mt-1">
            <InputText
              id="nidNumber"
              className={`w-full px-3 py-2 border ${errors.nidNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="National ID Card number"
              {...register('nidNumber', { required: 'NID Number is required' })}
            />
            {errors.nidNumber && <p className="mt-2 text-sm text-red-600">{errors.nidNumber.message}</p>}
          </div>
        </div>

        {/* NID Front Picture */}
        <div>
          <label htmlFor="nidFront" className="block text-sm font-medium text-gray-700">NID Front Picture</label>
          <div className="mt-1">
            <FileUpload
              id="nidFront"
              mode="basic"
              name="nidFront"
              accept="image/*"
              customUpload
              className={`w-full ${errors.nidFront ? 'p-invalid' : ''}`}
              onSelect={(e) => handleFileUpload(e, 'nidFront')}
            />
            {errors.nidFront && <p className="mt-2 text-sm text-red-600">{errors.nidFront.message}</p>}
          </div>
        </div>

        {/* NID Back Picture */}
        <div>
          <label htmlFor="nidBack" className="block text-sm font-medium text-gray-700">NID Back Picture</label>
          <div className="mt-1">
            <FileUpload
              id="nidBack"
              mode="basic"
              name="nidBack"
              accept="image/*"
              customUpload
              className={`w-full ${errors.nidBack ? 'p-invalid' : ''}`}
              onSelect={(e) => handleFileUpload(e, 'nidBack')}
            />
            {errors.nidBack && <p className="mt-2 text-sm text-red-600">{errors.nidBack.message}</p>}
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          label="Add Admin"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        />
      </div>
    </form>
  </div>
</div>
    );
};

export default FormComponent;

