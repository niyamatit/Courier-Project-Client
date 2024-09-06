import { useForm } from "react-hook-form"

import InputField from './InputField';
import SelectField from './SelectField';
import Section from './Section';
const BookingForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const watchValues = watch();
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className="p-4 sm:p-8 md:p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl w-full mx-auto shadow-lg p-4 sm:p-6 md:p-6 bg-white rounded-lg border-[2px] border-blue-400">
                <h1 className="text-xl sm:text-xl md:text-xl font-bold mb-4 sm:mb-6 md:mb-6 text-blue-700">
                    To-Pay P.S.L Lot Booking
                </h1>
                <div className="grid lg:grid-cols-2 gap-2">
                    {/* Customer Details Section */}
                    <div>
                        <Section>
                            <div className="grid grid-cols-2 gap-2">
                                <InputField watchValues={watchValues} register={register} name={"customerCode"} registerOptions={{ required: true }} errors={errors} label="Customer Code" placeholder="customer code" required />
                                <SelectField watchValues={watchValues} register={register} name={"counter"} registerOptions={{ required: true }} errors={errors} label="Select Counter" options={["Counter 1", "Counter 2", "Counter 3"]} />
                            </div>
                            <InputField watchValues={watchValues} register={register} name={"customerName"} registerOptions={{ required: true }} errors={errors} label="Customer Name" placeholder="customer name" required />
                        </Section>

                        {/* Sender Information Section */}
                        <Section title="Sender Information" additionalClasses="mt-6 mb-4">
                            <InputField watchValues={watchValues} register={register} name={"senderContactNo"} registerOptions={{ required: true }} errors={errors} label="Contact No." placeholder="sender contact no." required />
                            <InputField watchValues={watchValues} register={register} name={"senderName"} registerOptions={{ required: true }} errors={errors} label="Name" placeholder="sender name" required />
                            <InputField watchValues={watchValues} register={register} name={"address"} registerOptions={{ required: true }} errors={errors} label="Address" placeholder="sender address" required />
                        </Section>

                        {/* Reference Section */}
                        <Section>
                            <InputField watchValues={watchValues} register={register} name={"reference"} errors={errors} label="Reference" placeholder="reference" required />
                            <div className="flex gap-2 mt-4">
                                <input type="checkbox" defaultChecked className="checkbox mt-1" />
                                <h2 className="text-blue-800 font-semibold text-xl">H/D</h2>
                            </div>
                        </Section>
                        <Section additionalClasses="mt-4">
                            <InputField watchValues={watchValues} register={register} name={"branch"} registerOptions={{ required: true }} errors={errors} label="Dest. Branch" placeholder="" required />
                        </Section>

                        {/* Receiver Information Section */}
                        <Section title="Receiver Information" additionalClasses="mt-6">
                            <InputField watchValues={watchValues} register={register} name={"receiverContactNo"} registerOptions={{ required: true }} errors={errors} label="Contact No." placeholder="receiver contact no." required />
                            <InputField watchValues={watchValues} register={register} name={"receiverName"} registerOptions={{ required: true }} errors={errors} label="Name" placeholder="receiver name" required />
                            <InputField watchValues={watchValues} register={register} name={"receiveraddress"} registerOptions={{ required: true }} errors={errors} label="Address" placeholder="receiver address" required />
                        </Section>
                    </div>

                    <div>
                        {/* Booking Information Section */}
                        <Section title="Booking Information">
                            <div className="grid grid-cols-2 gap-1">
                                <InputField watchValues={watchValues} register={register} name={"CnNumber"} registerOptions={{ required: true }} errors={errors} label="CN Number" placeholder="CN no." required />
                                <textarea placeholder="" className="textarea textarea-bordered textarea-sm mt-6 bg-[#f9f5f1] text-black w-full max-w-xs"></textarea>
                            </div>
                            <InputField watchValues={watchValues} register={register} name={"bookingDate"} registerOptions={{ required: true }} errors={errors} label="Booking Date" placeholder="Booking date" required />
                            <InputField watchValues={watchValues} register={register} name={"bookingBranch"} registerOptions={{ required: true }} errors={errors} label="Booking Branch" placeholder="CRD" required />
                            <div className="grid grid-cols-2 gap-1">
                                <InputField watchValues={watchValues} register={register} name={"department"} registerOptions={{ required: true }} errors={errors} label="Department" placeholder="Department name" required />
                                <InputField watchValues={watchValues} register={register} name={"inputUser"} registerOptions={{ required: true }} errors={errors} label="Input User" placeholder="Input user" required />
                                <SelectField watchValues={watchValues} register={register} name={"serviceType"} registerOptions={{ required: true }} errors={errors} label="Service Type" options={["Service 1", "Service 2", "Service 3"]} />
                                <InputField watchValues={watchValues} register={register} name={"paymentMethod"} registerOptions={{ required: true }} errors={errors} label="Payment Method" placeholder="" required />
                            </div>
                        </Section>

                        {/* Product Section */}
                        <Section title="Product" additionalClasses="mt-4">
                            <div className="grid grid-cols-4 gap-2">

                                <InputField watchValues={watchValues} register={register} name={"product"} registerOptions={{ required: true }} errors={errors} label="Product" placeholder="product" required className="col-span-3" />


                                <InputField watchValues={watchValues} register={register} name={"lot"} registerOptions={{ required: true }} errors={errors} label="LOT" placeholder="lot" required />

                            </div>
                            <div className="grid grid-cols-3 gap-1">
                                <InputField watchValues={watchValues} register={register} name={"qty"} registerOptions={{ required: true }} errors={errors} label="Qty" placeholder="quantity" required />
                                <InputField watchValues={watchValues} register={register} name={"unit"} registerOptions={{ required: true }} errors={errors} label="Unit" placeholder="unit" required />
                                <InputField watchValues={watchValues} register={register} name={"rate"} registerOptions={{ required: true }} errors={errors} label="Rate" placeholder="rate" required />
                                <InputField watchValues={watchValues} register={register} name={"totalCharge"} registerOptions={{ required: true }} errors={errors} label="Total Charge" placeholder="total charge" required />
                                <InputField watchValues={watchValues} register={register} name={"h/dCharge"} registerOptions={{ required: true }} errors={errors} label="H/D Charge" placeholder="H/D charge" required />
                                <InputField watchValues={watchValues} register={register} name={"receivable"} registerOptions={{ required: true }} errors={errors} label="Receivable" placeholder="receivable" required />
                            </div>
                            <InputField watchValues={watchValues} register={register} name={"productDescription"} registerOptions={{ required: true }} errors={errors} label="Product Description" placeholder="description" required />
                        </Section>

                        {/* COD Section */}
                        <Section additionalClasses="mt-2">
                            <div className="grid grid-cols-2 gap-2">
                                <InputField watchValues={watchValues} register={register} name={"receiverPay"} registerOptions={{ required: true }} errors={errors} label="COD (Receiver will pay)" placeholder="" required />
                                <InputField watchValues={watchValues} register={register} name={"serviceCharge"} registerOptions={{ required: true }} errors={errors} label="COD Service charge" placeholder="" required />
                            </div>
                            <InputField watchValues={watchValues} register={register} name={"senderReceive"} registerOptions={{ required: true }} errors={errors} label="Sender will receive" placeholder="" required />
                        </Section>

                        {/* Remarks Section */}
                        <Section additionalClasses="mt-2">
                            <InputField watchValues={watchValues} register={register} name={"remarks"} registerOptions={{ required: true }} errors={errors} label="Remarks" placeholder="remarks" required />
                        </Section>
                    </div>

                </div>
                <div className='flex gap-5 mt-2 justify-center'>
                    <button type="button" className='btn bg-[#E8F0FE]'>Clear Form</button>
                    <button className='btn bg-[#E8F0FE]'>Submit</button>
                    <button type="button" className='btn bg-[#E8F0FE]'>View CN</button>
                    <button type="button" className='btn bg-[#E8F0FE]'>Re-Print CN</button>
                    <button type="button" className='btn bg-[#E8F0FE]'>Re-Print Barcode</button>
                    <button type="button" className='btn bg-[#E8F0FE]'>Close</button>
                </div>
            </form>

        </div>
    );
}

export default BookingForm;

