

import InputField from './InputField';
import SelectField from './SelectField';
import Section from './Section';
const BookingForm = () => {
    return (
        <div className="p-4 sm:p-8 md:p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl w-full mx-auto shadow-lg p-4 sm:p-6 md:p-6 bg-white rounded-lg border-[2px] border-blue-400">
                <h1 className="text-xl sm:text-xl md:text-xl font-bold mb-4 sm:mb-6 md:mb-6 text-blue-700">
                    To-Pay P.S.L Lot Booking
                </h1>
                <div className="grid lg:grid-cols-2 gap-2">
                    {/* Customer Details Section */}
                    <div>
                        <Section>
                            <div className="grid grid-cols-2 gap-2">
                                <InputField label="Customer Code" placeholder="customer code" required />
                                <SelectField label="Select Counter" options={["Counter 1", "Counter 2", "Counter 3"]} />
                            </div>
                            <InputField label="Customer Name" placeholder="customer name" required />
                        </Section>

                        {/* Sender Information Section */}
                        <Section title="Sender Information" additionalClasses="mt-6">
                            <InputField label="Contact No." placeholder="sender contact no." required />
                            <InputField label="Name" placeholder="sender name" required />
                            <InputField label="Address" placeholder="sender address" required />
                        </Section>

                        {/* Reference Section */}
                        <Section>
                            <InputField label="Reference" placeholder="reference" required />
                            <div className="flex gap-2 mt-4">
                                <input type="checkbox" defaultChecked className="checkbox mt-1" />
                                <h2 className="text-blue-800 font-semibold text-xl">H/D</h2>
                            </div>
                        </Section>

                        {/* Receiver Information Section */}
                        <Section title="Receiver Information" additionalClasses="mt-6">
                            <InputField label="Contact No." placeholder="receiver contact no." required />
                            <InputField label="Name" placeholder="receiver name" required />
                            <InputField label="Address" placeholder="receiver address" required />
                        </Section>
                    </div>

                    <div>
                        {/* Booking Information Section */}
                        <Section title="Booking Information">
                            <div className="grid grid-cols-2 gap-1">
                                <InputField label="CN Number" placeholder="CN no." required />
                                <textarea placeholder="" className="textarea textarea-bordered textarea-sm mt-6 bg-[#f9f5f1] text-black w-full max-w-xs"></textarea>
                            </div>
                            <InputField label="Booking Date" placeholder="Booking date" required />
                            <div className="grid grid-cols-2 gap-1">
                                <InputField label="Department" placeholder="Department name" required />
                                <InputField label="Input User" placeholder="Input user" required />
                                <SelectField label="Service Type" options={["Service 1", "Service 2", "Service 3"]} />
                                <InputField label="Payment Method" placeholder="" required />
                            </div>
                        </Section>

                        {/* Product Section */}
                        <Section title="Product" additionalClasses="mt-4">
                            <div className="grid grid-cols-4 gap-2">

                                <InputField label="Product" placeholder="product" required className="col-span-3" />


                                <InputField label="LOT" placeholder="lot" required />

                            </div>
                            <div className="grid grid-cols-3 gap-1">
                                <InputField label="Qty" placeholder="quantity" required />
                                <InputField label="Unit" placeholder="unit" required />
                                <InputField label="Rate" placeholder="rate" required />
                                <InputField label="Total Charge" placeholder="total charge" required />
                                <InputField label="H/D Charge" placeholder="H/D charge" required />
                                <InputField label="Receivable" placeholder="receivable" required />
                            </div>
                            <InputField label="Product Description" placeholder="description" required />
                        </Section>

                        {/* COD Section */}
                        <Section additionalClasses="mt-2">
                            <div className="grid grid-cols-2 gap-2">
                                <InputField label="COD (Receiver will pay)" placeholder="" required />
                                <InputField label="COD Service charge" placeholder="" required />
                            </div>
                            <InputField label="Sender will receive" placeholder="" required />
                        </Section>

                        {/* Remarks Section */}
                        <Section additionalClasses="mt-2">
                            <InputField label="Remarks" placeholder="remarks" required />
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingForm;

