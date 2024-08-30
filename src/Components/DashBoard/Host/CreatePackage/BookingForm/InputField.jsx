const InputField = ({ label, placeholder, type = "text", required = false, className, ...props }) => (
    <div className={`form-control ${className}`}>
        <label className="label">
            <span className="label-text text-gray-500 font-semibold">{label}</span>
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="input input-bordered bg-[#E8F0FE] text-black"
            required={required}
            {...props}
        />
    </div>
);

export default InputField;