const InputField = ({ label, placeholder, minLength={minLength},type = "text", required = false, className, register, name, watchValues, registerOptions, errors, ...props }) => (
    <div className={`form-control ${className}`}>
        <label className="label">
            <span className="label-text text-gray-500 font-semibold">{label}</span>
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="input input-bordered bg-[#E8F0FE] text-black"
            // required={required}
            {...register(name, registerOptions)}
            {...props}                                                                                       
            minLength={minLength}
        />
        {/* {errors[name] && (
      <p className="text-red-500 mt-1 text-sm">{errors[name].message}</p>
    )} */}

    </div>
);

export default InputField;