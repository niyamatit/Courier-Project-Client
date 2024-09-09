const SelectField = ({ label, options, required = false, register, name, registerOptions, errors, watchValues }) => (
    <div className="form-control">
        <label className="label">
            <span className="label-text text-gray-500 font-semibold">{label}</span>
        </label>
        <select className="select select-bordered bg-[#E8F0FE] text-black"
            // required={required}
            {...register(name, registerOptions)}
        >
            <option disabled selected>{label}</option>
            {options.map((option, index) => (
                <option key={index}>{option}</option>
            ))}

        </select>
        {errors[name] && !watchValues[name] && <p className="text-red-500">This field is required</p>}
    </div>
);

export default SelectField;