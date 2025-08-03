
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { imageUpload } from '../../../../api/utils';
import axiosSecure from '../../../../api/axiosSecure';
import { QueryClient } from '@tanstack/react-query';
import useUsersData from '../../../../hooks/useUsersData/useUsersData';

const FormComponent = () => {
     const [verifiedUser] = useUsersData();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
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
            console.log("Submitting form data:", data);

            // Upload NID images
            const nidFront = await imageUpload(data.nidFront);
            const nidBack = await imageUpload(data.nidBack);

            // Construct admin info object
            const adminInfo = {
                Admin_Number: data?.mobile || "",
                Admin_Name: data?.name || "",
                Admin_Address: data?.address || "",
                Admin_District_Name: data?.district || "",
                Admin_Area: data?.area || "",
                Admin_Nid: data?.Admin_nid || "",
                Admin_User_ID: data?.userId || "",
                Admin_Password: obfuscatePassword(data?.password) || "",
                role: "admin",
                NID_Front_Image: nidFront?.data?.data?.display_url || "",
                NID_Back_Image: nidBack?.data?.data?.display_url || "",
                date: new Date().toISOString().split('T')[0],
                Who_Added: verifiedUser?.email || "",
                Who_Added_Name: verifiedUser?.name || ""
            };

            // console.log("Admin Information:", adminInfo);

            // Send admin data to the server
            const ApplyAdminInfo = await axiosSecure.post("/admin/create", adminInfo);
            console.log("Admin creation response:", ApplyAdminInfo.data);
            QueryClient.invalidateQueries({ queryKey: ['admin'] })

            // Create admin login
            const AdminLogin = {
                name: data?.name || "",
                email: data?.userId || "",
                password: data?.password || "",
                role: "admin",
                imageUrl: "",
            };

            const response = await axiosSecure.post('/users/auth/register', AdminLogin);
            // console.log("Admin registration response:", response.data);
        } catch (error) {
            console.error("Error during form submission:", error.response?.data || error.message);
        }
    };

    const handleFileUpload = (event, name) => {
        const file = event.files[0];
        setValue(name, file, { shouldValidate: true });
    };


    return (
        <div className="flex flex-col items-center bg-slate-100 py-12 px-8">
            <h2 className="text-2xl text-gray-700 font-bold mb-8 text-center">Admin Add</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                {/* Name */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="name" className="block font-medium mb-2">Name</label>
                    <InputText
                        id="name"
                        className={`w-full ${errors.name ? 'p-invalid' : ''}`}
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <small className="text-red-500">{errors.name.message}</small>}
                </div>

                {/* Mobile */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="mobile" className="block font-medium mb-2">Mobile</label>
                    <InputText
                        id="mobile"
                        className={`w-full ${errors.mobile ? 'p-invalid' : ''}`}
                        {...register('mobile', { required: 'Mobile number is required' })}
                    />
                    {errors.mobile && <small className="text-red-500">{errors.mobile.message}</small>}
                </div>

                {/* Address */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="address" className="block font-medium mb-2">Address</label>
                    <InputText
                        id="address"
                        className={`w-full ${errors.address ? 'p-invalid' : ''}`}
                        {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && <small className="text-red-500">{errors.address.message}</small>}
                </div>

                {/* District */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="district" className="block font-medium mb-2">District</label>
                    <InputText
                        id="district"
                        className={`w-full ${errors.district ? 'p-invalid' : ''}`}
                        {...register('district', { required: 'District is required' })}
                    />
                    {errors.district && <small className="text-red-500">{errors.district.message}</small>}
                </div>

                {/* Area */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="area" className="block font-medium mb-2">Area</label>
                    <InputText
                        id="area"
                        className={`w-full ${errors.area ? 'p-invalid' : ''}`}
                        {...register('area', { required: 'Area is required' })}
                    />
                    {errors.area && <small className="text-red-500">{errors.area.message}</small>}
                </div>
                {/* Password */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="password" className="block font-medium mb-2">Password</label>
                    <Password
                        id="password"
                        className={`w-full ${errors.password ? 'p-invalid' : ''}`}
                        toggleMask
                        onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })}
                    />
                    {errors.password && <small className="text-red-500">{errors.password.message}</small>}
                </div>

                {/* UserID */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="userId" className="block font-medium mb-2">UserID</label>
                    <InputText
                        id="userId"
                        className={`w-full ${errors.userId ? 'p-invalid' : ''}`}
                        {...register('userId', { required: 'UserID is required' })}
                    />
                    {errors.userId && <small className="text-red-500">{errors.userId.message}</small>}
                </div>



                {/* NID Number */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="nidNumber" className="block font-medium mb-2">NID Number</label>
                    <InputText
                        id="nidNumber"
                        className={`w-full ${errors.nidNumber ? 'p-invalid' : ''}`}
                        {...register('nidNumber', { required: 'NID Number is required' })}
                    />
                    {errors.nidNumber && <small className="text-red-500">{errors.nidNumber.message}</small>}
                </div>

                {/* NID Front Picture */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="nidFront" className="block font-medium mb-2">NID Front Picture</label>
                    <FileUpload
                        id="nidFront"
                        mode="basic"
                        name="nidFront"
                        accept="image/*"
                        customUpload
                        className={`w-full ${errors.nidFront ? 'p-invalid' : ''}`}
                        onSelect={(e) => handleFileUpload(e, 'nidFront')}
                    />
                    {errors.nidFront && <small className="text-red-500">{errors.nidFront.message}</small>}
                </div>

                {/* NID Back Picture */}
                <div className='md:col-span-2 col-span-4'>
                    <label htmlFor="nidBack" className="block font-medium mb-2">NID Back Picture</label>
                    <FileUpload
                        id="nidBack"
                        mode="basic"
                        name="nidBack"
                        accept="image/*"
                        customUpload
                        className={`w-full ${errors.nidBack ? 'p-invalid' : ''}`}
                        onSelect={(e) => handleFileUpload(e, 'nidBack')}
                    />
                    {errors.nidBack && <small className="text-red-500">{errors.nidBack.message}</small>}
                </div>

                {/* Submit Button */}
                <div className="col-span-4 flex justify-center mt-6">
                    <Button type="submit" label="Submit" className="p-button-success p-2 text-white bg-blue-500 pl-4 pr-4" />
                </div>
            </form>
        </div>
    );
};

export default FormComponent;

