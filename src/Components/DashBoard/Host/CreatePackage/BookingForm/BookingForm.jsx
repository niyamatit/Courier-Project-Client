import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Section from "./Section";
import axiosSecure from "../../../../../api/axiosSecure";
import Swal from "sweetalert2";
import OfflinePrintModal from "./OfflinePrintModal";
import { useQuery } from "@tanstack/react-query";
import useUsersData from "../../../../../hooks/useUsersData/useUsersData";

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const watchValues = watch();

  const [cnNumber, setCnNumber] = useState("");
  const [codCharge, setCodCharge] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [senderReceive, setSenderReceive] = useState(0);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [senderContactNo, setSenderContactNo] = useState("");
  const [senderInfo, setSenderInfo] = useState({
    name: "",
    address: "",
  });
  const [receiverContactNo, setReceiverContactNo] = useState("");
  const [receiverInfo, setReceiverInfo] = useState({
    ReceiverName: "",
    ReceiverAddress: "",
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  
  const [cnCounter, setCnCounter] = useState(1);
  
  useEffect(() => {
    const generateUniqueCnNumber = () => {
      
      setCnCounter((prevCounter) => prevCounter + 1);
      const timestamp = Date.now().toString().slice(0, 8);
      const uniqueNumber = `NEPNU-OFF-000${timestamp}${cnCounter.toString()}`;
      
      setCnNumber(uniqueNumber);
      setValue("CnNumber", uniqueNumber);
    };

    generateUniqueCnNumber();
  }, [setValue]);

  // Auto-generate the current booking date on component mount
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in "YYYY-MM-DD" format
    setValue("bookingDate", currentDate); // Set booking date in the form
  }, [setValue]);

  // Calculate service charge and sender receive based on COD charge
  useEffect(() => {
    if (codCharge > 0) {
      let calculatedServiceCharge = 20; // Initial service charge for the first 1000
      if (codCharge > 1000) {
        const additionalCharge = Math.ceil((codCharge - 1000) / 1000) * 10; // 10 per additional 1000
        calculatedServiceCharge += additionalCharge;
      }

      setServiceCharge(calculatedServiceCharge);
      setSenderReceive(codCharge - calculatedServiceCharge);
    } else {
      setServiceCharge(0);
      setSenderReceive(0);
    }

    // Update form values for serviceCharge and senderReceive
    setValue("serviceCharge", serviceCharge);
    setValue("senderReceive", senderReceive);
  }, [codCharge, setValue, serviceCharge, senderReceive]);

  const handleCodChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCodCharge(isNaN(value) ? 0 : value); 
  };

  const onSubmit = async (data) => {
    console.log(data);
    const ParcelProductDetails = await axiosSecure.post("/offline", data);
    console.log(ParcelProductDetails.data);
    if (ParcelProductDetails.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Parcel Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setBookingInfo(data);
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (senderContactNo) {
        try {
          const response = await axiosSecure.get(`/offline/${senderContactNo}`);
          if (response.data) {
            setSenderInfo({
              name: response.data.senderName,
              address: response.data.address,
            });
          }
        } catch (error) {
          setSenderInfo({ name: "", address: "" });
        }
      }
    };

    fetchCustomerDetails();
  }, [senderContactNo]);
  useEffect(() => {
    const fetchReceiverDetails = async () => {
      if (receiverContactNo) {
        try {
          const response = await axiosSecure.get(
            `/offline/receiver/${receiverContactNo}`
          );
          if (response.data) {
            setReceiverInfo({
              ReceiverName: response.data.receiverName,
              ReceiverAddress: response.data.receiveraddress,
            });
          }
        } catch (error) {
          setReceiverInfo({ ReceiverName: "", ReceiverAddress: "" });
        }
      }
    };

    fetchReceiverDetails();
  }, [receiverContactNo]);

  const {  data: users = []} = useQuery({
    queryKey: ['users'],
    queryFn: async() => {
        const res = await axiosSecure.get("/users");
        return res.data;
       
    }
    
});

const [verifiedUser] = useUsersData();

  return (
    <div className="p-4 sm:p-8 md:p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl w-full mx-auto shadow-lg p-4 sm:p-6 md:p-6 bg-white rounded-lg border-[2px] border-blue-400"
      >
        <h1 className="text-xl sm:text-xl md:text-xl font-bold mb-4 sm:mb-6 md:mb-6 text-blue-700">
          P.S.L Lot Booking
        </h1>
        <div className="grid lg:grid-cols-2 gap-2">
          <div>
            <Section>
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"customerCode"}
                  registerOptions={{ required: false }}
                  errors={errors}
                  label="Customer Code"
                  placeholder="customer code"
                  
                />
                <SelectField
                  watchValues={watchValues}
                  register={register}
                  name={"counter"}
                  registerOptions={{ required: false }}
                  errors={errors}
                  label="Select Counter"
                  options={["Counter 1", "Counter 2", "Counter 3"]}
                />
              </div>
              <InputField
                watchValues={watchValues}
                register={register}
                name={"customerName"}
                registerOptions={{ required: false }}
                errors={errors}
                label="Customer Name"
                placeholder="customer name"
                
              />
            </Section>

            {/* Sender Information Section */}
            <Section title="Sender Information" additionalClasses="mt-6 mb-4">
              <InputField
                watchValues={watchValues}
                register={register}
                name={"senderContactNo"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Contact No."
                placeholder="sender contact no."
                required
                onChange={(e) => setSenderContactNo(e.target.value)}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"senderName"}
                registerOptions={{ required: senderInfo.name ? false : true }}
                errors={errors}
                label="Name"
                placeholder="sender name"
                defaultValue={senderInfo.name}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name="address"
                registerOptions={{ required: !senderInfo.address }} 
                
                errors={errors}
                label="Address"
                placeholder="Sender Address"
                defaultValue={senderInfo.address || ""}
                required={!!senderInfo.address} 
              />
            </Section>

            {/* Reference Section */}
            <Section>
              <InputField
                watchValues={watchValues}
                register={register}
                name={"reference"}
                errors={errors}
                label="Reference"
                placeholder="reference"
                required
              />
              <div className="flex gap-2 mt-4">
                <input type="checkbox" className="checkbox mt-1" />
                <h2 className="text-blue-800 font-semibold text-xl">H/D</h2>
                <input type="checkbox" className="checkbox mt-1" />
                <h2 className="text-blue-800 font-semibold text-xl">
                  Exchange
                </h2>
              </div>
            </Section>
            <Section additionalClasses="mt-4">
              {/* <InputField
                watchValues={watchValues}
                register={register}
                name={"branch"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Dest. Branch"
                placeholder=""
                required
              /> */}
              <div className="col-span-2 md:col-span-2 lg:col-span-1">
                <label className="label-text ml-1 text-gray-500 font-semibold">
                Select Dest. Branch*
                </label>
                 <select
                  {...register('branch', { required: true })}
                  className={`select select-bordered mt-2  bg-[#E8F0FE] text-black w-full p-2 rounded-lg border ${
                    errors.branch ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="123">Select Dest. Branch</option>
                  {
                    users.filter(user=>user?.role === 'host').map(user=>(
                      <option key={user._id} value={user?.name}>
              {user?.name || "No Name Found"}
            </option>
                    ))
                  }
                  
                </select>
                {errors.select_branch_name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </Section>

            {/* Receiver Information Section */}
            <Section title="Receiver Information" additionalClasses="mt-6">
              <InputField
                watchValues={watchValues}
                register={register}
                name={"receiverContactNo"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Contact No."
                placeholder="receiver contact no."
                onChange={(e) => setReceiverContactNo(e.target.value)}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"receiverName"}
                registerOptions={{
                  required: receiverInfo.ReceiverName ? false : true,
                }}
                errors={errors}
                label="Name"
                placeholder="receiver name"
                defaultValue={receiverInfo.ReceiverName}
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"receiveraddress"}
                registerOptions={{
                  required: receiverInfo.ReceiverAddress ? false : true,
                }}
                errors={errors}
                label="Address"
                placeholder="receiver address"
                defaultValue={receiverInfo.ReceiverAddress}
              />
            </Section>
          </div>

          <div>
            {/* Booking Information Section */}
            <Section title="Booking Information">
             
               <div className="grid grid-cols-2 gap-2">
               <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"CnNumber"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="CN Number"
                  placeholder="CN no."
                  required
                  defaultValue={cnNumber} 
                  className="w-full"
                />
                <textarea
                  placeholder=""
                  className="textarea textarea-bordered textarea-sm mt-6 bg-[#f9f5f1] text-black w-full max-w-xs"
                ></textarea>
               </div>
              
              {/* Auto-generated booking date */}
              <InputField
                watchValues={watchValues}
                register={register}
                name={"bookingDate"}
                errors={errors}
                label="Booking Date"
                required
                readOnly
              />
              <InputField
                watchValues={watchValues}
                register={register}
                name={"bookingBranch"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Booking Branch"
                placeholder="CRD"
                required
                value={verifiedUser?.name || "No Branch Name Found"}
                readOnly
              />
              <div className="grid grid-cols-2 gap-1">
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"department"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Department"
                  placeholder="Department name"
                  required
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"inputUser"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Input User"
                  placeholder="Input user"
                  required
                />
                <SelectField
                  watchValues={watchValues}
                  register={register}
                  name={"serviceType"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Service Type"
                  options={["Service 1", "Service 2", "Service 3"]}
                />
                {/* Payment Method Dropdown */}
                <SelectField
                  watchValues={watchValues}
                  register={register}
                  name={"paymentMethod"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Payment Method"
                  options={["Cash", "To Pay", "Credit"]}
                  required
                />
              </div>
            </Section>
            {/* Product Section */}
            <Section title="Product" additionalClasses="mt-4">
              <div className="grid grid-cols-4 gap-2">
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"product"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Product"
                  placeholder="product"
                  required
                  className="col-span-3"
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"lot"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="LOT"
                  placeholder="lot"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"qty"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Qty"
                  placeholder="quantity"
                  required
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"unit"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Unit"
                  placeholder="unit"
                  required
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"rate"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Rate"
                  placeholder="rate"
                  required
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"totalCharge"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Total Charge"
                  placeholder="total charge"
                  required
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"h/dCharge"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="H/D Charge"
                  placeholder=""
                  required
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"othCharge"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="Oth. Charge"
                  placeholder=""
                  required
                />
              </div>
            </Section>
            {/* COD Section */}
            <Section additionalClasses="mt-2">
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"receiverPay"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="COD (Receiver will pay)"
                  placeholder=""
                  required
                  onChange={handleCodChange} // Handle COD input change
                />
                <InputField
                  watchValues={watchValues}
                  register={register}
                  name={"serviceCharge"}
                  registerOptions={{ required: true }}
                  errors={errors}
                  label="COD Service charge"
                  placeholder=""
                  required
                  value={serviceCharge}
                  readOnly
                />
              </div>
              <InputField
                watchValues={watchValues}
                register={register}
                name={"senderReceive"}
                registerOptions={{ required: true }}
                errors={errors}
                label="Sender will receive"
                placeholder=""
                required
                value={senderReceive}
                readOnly
              />
            </Section>
            .
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-5 mt-2 justify-center">
          <button className="btn bg-[#E8F0FE]">Submit</button>
        </div>
      </form>
      <OfflinePrintModal
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={bookingInfo}
      />
    </div>
  );
};

export default BookingForm;
