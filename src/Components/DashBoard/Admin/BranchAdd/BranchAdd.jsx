
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import axiosSecure from "../../../../api/axiosSecure";
import Swal from "sweetalert2";
import { Areas, Districts } from "../../../../Data/Location";

import { useQuery } from "@tanstack/react-query";
// import { imageUpload } from "../../../../api/utils";
// import useAuth from "../../../../hooks/useAuth";

const BranchAdd = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [SupportCompany, setSupportCompany] = useState("");
  // const [loading, setLoading] = useState(false);
  const [filteredAreas, setFilteredAreas] = useState([]);

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async() => {
        const res = await axiosSecure.get("/shfjksdhfjdjkfhxnbcnbc67437gch");
        return res.data;
       
    }

  });
  const { data: Company = [] } = useQuery({
    queryKey: ['Company'],
    queryFn: async() => {
        const res = await axiosSecure.get("/Company");
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
// Function to obfuscate the password
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

// Function to de-obfuscate the password
const deobfuscatePassword = (obfuscatedPassword) => {
  let actualPassword = "";
  for (let i = 0; i < obfuscatedPassword.length; i += 21) {
    actualPassword += obfuscatedPassword[i]; 
  }
  return actualPassword;
};



      const BranchInformation = {
        Branch_Number: formData?.contactNumber || "",
        Branch_Name: formData?.YourName || "",
        Branch_Commission: parseFloat(formData?.branch_lav) || 0,
        Branch_Address: formData?.YourCurrentAddress || "",
        Branch_District_Name: formData?.district || "",
        Branch_Area: formData?.area || "",
        Branch_type: formData?.branch_type || "",
        Branch_User_ID: formData?.Staff_User_ID || "",
        Branch_Support_Company: formData?.supportCompany || "",
        Reference: formData?.reference || "",
        Branch_IP_Number:  formData?.IPNumber || "",
        email: formData?.Staff_User_ID || "",
        
        Branch_Password:obfuscatePassword(formData?.Staff_Password || "") ||   "",
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
          imageUrl: "",
          Branch_Number: formData?.contactNumber || "",
          Branch_Address: formData?.YourCurrentAddress || "",
          Branch_District_Name: formData?.district || "",
          Branch_Area: formData?.area || "",
        };

       if(verifyBrnach)
       {
        const response = await axiosSecure.post('/users/auth/register', BranchLogin);
       }

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
const verifyBrnach = SupportCompany === 'Niyamat Express';


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
                {/* Support Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mt-4 mb-4">
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Reference / Special Introduction
                    </label>
                    <input
                      type="text"
                      {...register('reference', { required: false })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${errors.reference ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.reference && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Support Company*
                    </label>
                    <select
                      {...register('supportCompany', { required: true })}
                      className={`select select-bordered w-full p-2 rounded-lg border ${errors.supportCompany ? 'border-red-500' : 'border-gray-300'
                        }`}
                      onChange={(e)=> setSupportCompany(e.target.value)}
                    >
                      <option value="hfjkdhjfhdjfj">Select Company</option>

                      {
                        Company.map(user => (
                          <option key={user?._id} value={user?.Company_Name}>{user?.Company_Name}</option>
                        ))
                      }

                    </select>
                    {errors.staff_post && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                </div>
              
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
                  {
                     verifyBrnach && <div className="col-span-2 md:col-span-2 lg:col-span-1">
                     <label className="block text-gray-700 font-medium mb-1">
                       Branch Contact Number*
                     </label>
                     <input
                       type="text"
                       {...register('contactNumber', { required: verifyBrnach ? true : false})}
                       className={`input input-bordered w-full p-2 rounded-lg border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                         }`}
                     />
                     {errors.contactNumber && (
                       <span className="text-red-500">This field is required</span>
                     )}
                   </div>
                  }
                  {
                    verifyBrnach && <div className="col-span-2 md:col-span-2 lg:col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">
                      Branch  IP Number
                    </label>
                    <input
                      type="text"
                      {...register('IPNumber', { required: false })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${errors.IPNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.IPNumber && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  }
          
                 {
                  verifyBrnach &&  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Branch Type*
                  </label>
                  <select
                    {...register('branch_type', { required: verifyBrnach ? true : false })}
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
                 }

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
                      Area
                    </label>
                    <select
                      {...register('area', { required: false })}
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


                {
                  verifyBrnach && <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mt-4">
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Branch commission
                    </label>
                    <input
                      type="text"
                      {...register('branch_lav', { required: false })}
                      className={`input input-bordered w-full p-2 rounded-lg border ${errors.branch_lav ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.branch_lav && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-2 lg:col-span-1">
                    <label className="block text-gray-700 font-medium mb-1">
                      Under Branch
                    </label>
                    <select
                      {...register('under_branch', { required: false })}
                      className={`select select-bordered w-full p-2 rounded-lg border ${errors.under_branch ? 'border-red-500' : 'border-gray-300'
                        }`}

                    >
                      <option value="hfjkdhjfhdjfj">Select Branch</option>

                      {
                        users.filter(user => user?.role === 'host').map(user => (
                          <option key={user?._id} value={user?.name}>{user?.name}</option>
                        ))
                      }

                    </select>
                    {errors.staff_post && (
                      <span className="text-red-500">This field is required</span>
                    )}
                  </div>
                </div>
                }
                {
                verifyBrnach && 
                <div>
               <div className="col-span-2 md:col-span-2 lg:col-span-1 my-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Branch  User ID*
                  </label>
                  <input
                    type="text"
                    {...register('Staff_User_ID', { required: verifyBrnach ? true : false })}
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
                    {...register('Staff_Password', { required: verifyBrnach ? true : false })}
                    className={`input input-bordered w-full p-2 rounded-lg border ${errors.Staff_Password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      
                  />
                 
                    {errors.Staff_Password?.type === 'minLength' && (
    <span className="text-red-500">Password must be at least 8 characters long</span>
  )}
                </div>
               </div>
               }
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
