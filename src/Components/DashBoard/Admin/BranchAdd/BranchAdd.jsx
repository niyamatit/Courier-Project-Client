
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";
import { Areas, Districts } from "../../../../Data/Location";
import useUsersData from "../../../../hooks/useUsersData/useUsersData";
import { useQuery } from "@tanstack/react-query";
// import { imageUpload } from "../../../../api/utils";
// import useAuth from "../../../../hooks/useAuth";

const BranchAdd = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  // const [loading, setLoading] = useState(false);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [verifiedUser] = useUsersData();
  const {  data: users = []} = useQuery({
    queryKey: ['users'],
    queryFn: async() => {
        const res = await axiosSecure.get("/users");
        return res.data;
       
    }
    
});

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();



  useEffect(() => {
    if (selectedDistrict) {
      setFilteredAreas(Areas.filter(area => area.district_id === selectedDistrict));
    } else {
      setFilteredAreas([]);
    }
  }, [selectedDistrict]);

  const getDistrictName = (id) => {
    const district = Districts.find(district => district.id === id);
    return district ? district.name : "";
  };

  const getServiceTypes = () => {
    if (selectedDistrict === '47' || selectedDistrict === '43') {
      return [
        { value: 'Regular Delivery', label: 'Regular Delivery' },
        { value: 'Express Delivery', label: 'Express Delivery' },
        { value: 'Same Day Delivery', label: 'Same Day Delivery' },
      ];
    } else {
      return [
        { value: 'Regular Delivery', label: 'Regular Delivery' },
      ];
    }
  };

  const onSubmit = async (data) => {
    try {
      const districtName = getDistrictName(data.district);
      const formData = { ...data, district: districtName };



      const BranchInformation = {
        Branch_Number: formData?.contactNumber || "",
        Branch_Name: formData?.YourName || "",
        Branch_Commission: parseFloat(formData?.branch_lav) || 0,
        Branch_Address: formData?.YourCurrentAddress || "",
        Branch_District_Name: formData?.district || "",
        Branch_Area: formData?.area || "",
        Branch_type: formData?.branch_type || "",
        Branch_User_ID: formData?.Staff_User_ID || "",
        Branch_Password: formData?.Staff_Password || "",
        Under_Branch: formData?.under_branch || "",
        Date: new Date().toISOString().split('T')[0],

      };


      const BranchInfo = await axiosSecure.post("/branch", BranchInformation);

      if (BranchInfo.data.insertedId) {

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Branch Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });


        const BranchLogin = {
          name: formData?.YourName || "",
          email: formData?.Staff_User_ID || "",
          password: formData?.Staff_Password || "",
          role: "host",
          imageUrl: ""
        };

        const response = await axiosSecure.post('/users/auth/register', BranchLogin);

      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Branch or User ID Already Exists",
          showConfirmButton: false,
          timer: 1500,
        });

      } else {
        console.error("Unexpected Error:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };



  return (
    <div className="p-4 sm:p-8 md:p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto shadow-lg p-4 sm:p-6 md:p-6 bg-white rounded-lg border-[2px] border-blue-400">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-6 text-center text-blue-700">
          Add Branch
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 md:space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 lg:gap-6">
            <div className="col-span-2 space-y-4 sm:space-y-6 md:space-y-6">
              <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 md:mb-6 text-blue-600">
                  Branch Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">

                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Branch Name*
                    </label>
                    <input
                      type="text"
                      {...register('YourName', { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${errors.YourName ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.YourName && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Branch Number*
                    </label>
                    <input
                      type="text"
                      {...register('contactNumber', { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.contactNumber && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  {/* Father and Mother Name */}
                  {/* <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <label className="block text-gray-700 font-medium mb-1">
                Staff Father Name*
                </label>
                <input
                  type="text"
                  {...register('FatherName', { required: true })}
                  className={`input input-bordered w-full p-2 rounded-lg border ${
                    errors.FatherName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.FatherName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Staff Mother Name*
                </label>
                <input
                  type="text"
                  {...register('MotherName', { required: true })}
                  className={`input input-bordered w-full p-2 rounded-lg border ${
                    errors.MotherName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.MotherName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <label className="block text-gray-700 font-medium mb-1">
                Staff Date of Birth*
                </label>
                <input
                  type="date"
                  {...register('date_of_birth', { required: true })}
                  className={`input input-bordered w-full p-2 rounded-lg border ${
                    errors.date_of_birth ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date_of_birth && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <label className="block text-gray-700 font-medium mb-1">
                Staff Married Status*
                </label>
                 <select
                  {...register('married_status', { required: true })}
                  className={`select select-bordered w-full p-2 rounded-lg border ${
                    errors.married_status ? 'border-red-500' : 'border-gray-300'
                  }`}
                  
                >
                  <option value="">Married Status</option>
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                  
                </select>
                {errors.married_status && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div> */}
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Branch Type*
                    </label>
                    <select
                      {...register('branch_type', { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border ${errors.branch_type ? 'border-red-500' : 'border-gray-300'
                        }`}

                    >
                      <option value="">Select Type</option>
                      <option value="Union">Union</option>
                      <option value="Sub-district">Sub-district</option>
                      <option value="District">District</option>
                      <option value="Divisional">Divisional</option>

                    </select>
                    {errors.staff_post && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  {/* <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <label className="block text-gray-700 font-medium mb-1">
                Staff User ID*
                </label>
                 <select
                  {...register('staff_User_ID', { required: true })}
                  className={`select select-bordered w-full p-2 rounded-lg border ${
                    errors.staff_User_ID ? 'border-red-500' : 'border-gray-300'
                  }`}
                  
                >
                  <option value="">Select a User ID</option>
                  <option value="Manager">Manager</option>
                  <option value="Asst. Manager">Asst. Manager</option>
                  
                  
                </select>
                {errors.staff_User_ID && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div> */}
                  {/* Current Address */}
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Branch  Address*
                    </label>
                    <input
                      type="text"
                      {...register('YourCurrentAddress', { required: true })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${errors.YourCurrentAddress ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.YourCurrentAddress && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  {/* <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <label className="block text-gray-700 font-medium mb-1">
                Staff Parmanent  Address*
                </label>
                <input
                  type="text"
                  {...register('YourParmanentAddress', { required: true })}
                  className={`input input-bordered w-full p-2 rounded-lg border ${
                    errors.YourParmanentAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.YourParmanentAddress && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div> */}
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Districts*
                    </label>
                    <select
                      {...register('district', { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border ${errors.district ? 'border-red-500' : 'border-gray-300'
                        }`}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                      <option value="">Select District</option>
                      {Districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Area*
                    </label>
                    <select
                      {...register('area', { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border ${errors.area ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                      <option value="">Select Area</option>
                      {filteredAreas.map((area) => (
                        <option key={area.id} value={area.name}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                    {errors.area && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                </div>
                {/* Your Image */}
                {/* <div className="col-span-2 md:col-span-2 lg:col-span-1 my-2">
                  <label className="block text-gray-700 font-medium mb-1">
                  Staff Image*
                  </label>
                  <input
                    type="file"
                    {...register("yourImage", { required: true })}
                    className={`input input-bordered w-full p-2 rounded-lg border ${
                      errors.yourImage ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.yourImage && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div> */}
                {/* <div className="col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                  Staff NID Front Image*
                  </label>
                  <input
                    type="file"
                    {...register("nidFrontImage", { required: true })}
                    className={`input input-bordered w-full p-2 rounded-lg border ${
                      errors.nidFrontImage ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nidFrontImage && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div> */}
                {/* NID Back Image */}
                {/* <div className="col-span-2 my-2">
                  <label className="block text-gray-700 font-medium mb-1">
                  Staff NID Back Image*
                  </label>
                  <input required
                    type="file"
                    {...register("nidBackImage", { required: true })}
                    className={`input input-bordered w-full p-2 rounded-lg border ${
                      errors.nidBackImage ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nidBackImage && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mt-4">
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Branch commission*
                  </label>
                  <input
                    type="text"
                    {...register('branch_lav', { required: true })}
                    className={`input input-bordered w-full p-2 rounded-lg border ${errors.branch_lav ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.branch_lav && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Under Branch*
                    </label>
                    <select
                      {...register('under_branch', { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border ${errors.under_branch ? 'border-red-500' : 'border-gray-300'
                        }`}

                    >
                      <option value="hfjkdhjfhdjfj">Select Branch</option>
                      
                      {
                        users.filter(user=>user?.role === 'host').map(user=>(
                          <option key={user?._id} value={user?.name}>{user?.name}</option>
                        ))
                      }

                    </select>
                    {errors.staff_post && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-1 my-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Branch  User ID*
                  </label>
                  <input
                    type="text"
                    {...register('Staff_User_ID', { required: true })}
                    className={`input input-bordered w-full p-2 rounded-lg border ${errors.Staff_User_ID ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.Staff_User_ID && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Branch  Password*
                  </label>
                  <input
                    type="password"
                    {...register('Staff_Password', { required: true })}
                    className={`input input-bordered w-full p-2 rounded-lg border ${errors.Staff_Password ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.Staff_Password && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              {/* Parcel Area */}

            </div>


          </div>


          <button
            type="submit"
            className="btn w-full hover:bg-blue-600 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>

        </form>
      </div>
    </div>



  );
};

export default BranchAdd;
