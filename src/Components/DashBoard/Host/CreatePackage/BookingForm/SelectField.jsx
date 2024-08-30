const SelectField = ({ label, options, required = false }) => (
    <div className="form-control">
        <label className="label">
            <span className="label-text text-gray-500 font-semibold">{label}</span>
        </label>
        <select className="select select-bordered bg-[#E8F0FE] text-black" required={required}>
            <option disabled selected>{label}</option>
            {options.map((option, index) => (
                <option key={index}>{option}</option>
            ))}
        </select>
    </div>
);

export default SelectField;