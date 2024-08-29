
const BookingForm = () => {
    return (
        <div className="p-4 sm:p-8 md:p-8 bg-gradient-to-r from-gray-200 to-gray-200 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl w-full mx-auto shadow-lg p-4 sm:p-6 md:p-6 bg-white rounded-lg border-[2px] border-blue-400">
                <h1 className="text-xl sm:text-xl md:text-xl font-bold mb-4 sm:mb-6 md:mb-6 text-blue-700">
                    To-Pay P.S.L Lot Booking
                </h1>
                <div className="grid lg:grid-cols-2 gap-2">
                    {/* customer details */}
                    <div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <form className="">
                                <div className="border rounded-lg p-4 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">Customer Code</span>
                                            </label>
                                            <input type="text" placeholder="customer code" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                        <div className="form-control mt-9">
                                            <select className="select select-bordered  bg-[#E8F0FE] text-black">
                                                <option disabled selected>Select Counter</option>
                                                <option></option>
                                                <option></option>
                                                <option></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Customer Name</span>
                                        </label>
                                        <input type="text" placeholder="customer name" className="input input-bordered bg-[#E8F0FE] text-black" required />

                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* sender information */}
                        <h2 className="text-xl sm:text-xl md:text-xl font-bold mb-4 sm:mb-6 md:mb-6 text-blue-900 mt-6">Sender Information</h2>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <form className="">
                                <div className="border rounded-lg p-4 shadow-sm">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Contact No.</span>
                                        </label>
                                        <input type="text" placeholder="sender contact no." className="input input-bordered bg-[#E8F0FE] text-black" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Name</span>
                                        </label>
                                        <input type="text" placeholder="text" className="input input-bordered bg-[#E8F0FE] text-black" required />

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Address</span>
                                        </label>
                                        <input type="text" placeholder="sender address" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* reference */}

                        <div>
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className=" text-blue-800 font-semibold">Reference</span>
                                </label>
                                <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" defaultChecked className="checkbox mt-4" />
                            <h2 className="mt-3 text-blue-800 font-semibold text-xl">H/D</h2>
                        </div>

                        {/* Receiver information */}
                        <h2 className="text-xl sm:text-xl md:text-xl font-bold mb-4 sm:mb-6 md:mb-6 text-blue-900 mt-6">Receiver Information</h2>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <form className="">
                                <div className="border rounded-lg p-4 shadow-sm">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Contact No.</span>
                                        </label>
                                        <input type="text" placeholder="sender contact no." className="input input-bordered bg-[#E8F0FE] text-black" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Name</span>
                                        </label>
                                        <input type="text" placeholder="text" className="input input-bordered bg-[#E8F0FE] text-black" required />

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Address</span>
                                        </label>
                                        <input type="text" placeholder="sender address" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        {/* booking information */}
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <form className="">
                                <div className="border rounded-lg p-4 shadow-sm">
                                    <div className="grid grid-cols-2 gap-1">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">CN Number</span>
                                            </label>
                                            <input type="text" placeholder="CN no." className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                        <div className="">
                                            <textarea
                                                placeholder=""
                                                className="textarea textarea-bordered textarea-sm mt-6 bg-[#f9f5f1] text-black w-full max-w-xs"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Booking Date</span>
                                        </label>
                                        <input type="text" placeholder="Booking date" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-1">
                                        <div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-gray-500 font-semibold">Department</span>
                                                </label>
                                                <input type="text" placeholder="Department name" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-gray-500 font-semibold">Input User</span>
                                                </label>
                                                <input type="text" placeholder="Input user" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="form-control mt-9">
                                                <select className="select select-bordered  bg-[#E8F0FE] text-black">
                                                    <option disabled selected>Service Type</option>
                                                    <option></option>
                                                    <option></option>
                                                    <option></option>
                                                </select>
                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-red-700 font-semibold">Payment Method</span>
                                                </label>
                                                <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </form>

                        </div>
                        {/* product */}
                        <div className="p-3 mt-4 bg-slate-50 rounded-lg">
                            <form className="">
                                <div className="border rounded-lg p-4 shadow-sm">
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="form-control col-span-3">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">Product</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">LOT</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">Qty</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">Unit</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">Rate</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">Total Charge</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">H/D Charge</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-400 font-bold">Recieveable</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Product Description</span>
                                        </label>
                                        <input type="text" placeholder="description" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                    </div>
                                </div>

                                <div className="border rounded-lg p-2 mt-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">COD (Reciever will pay)</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-gray-500 font-semibold">COD Service charge</span>
                                            </label>
                                            <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Sender will receive</span>
                                        </label>
                                        <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                    </div>
                                </div>
                                <div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-gray-500 font-semibold">Remarks</span>
                                        </label>
                                        <input type="text" placeholder="" className="input input-bordered bg-[#E8F0FE] text-black" required />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default BookingForm;