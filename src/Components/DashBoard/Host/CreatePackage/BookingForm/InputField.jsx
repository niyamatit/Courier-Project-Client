// const InputField = ({ label, placeholder, minLength=0,type = "text", required = false, className, register, name, watchValues, registerOptions, errors, ...props }) => (
//     <div className={`form-control ${className}`}>
//         <label className="label">
//             <span className="label-text text-gray-500 font-semibold">{label}</span>
//         </label>
//         <input
//             type={type}
//             placeholder={placeholder}
//             className="input input-bordered bg-[#E8F0FE] text-black"
//             // required={required}
//             {...register(name, registerOptions)}
//             {...props}                                                                                       
//             minLength={minLength}
//         />
//         {/* {errors[name] && (
//       <p className="text-red-500 mt-1 text-sm">{errors[name].message}</p>
//     )} */}

//     </div>
// );

// export default InputField;
const InputField = ({
  label,
  placeholder,
  minLength = 0,
  type = "text",
  required = false,
  className,
  register,
  name,
  watchValues,
  registerOptions = {},
  errors,
  ...props
}) => {
  const { onChange: customOnChange, ...restProps } = props;

  return (
    <div className={`form-control ${className}`}>
      <label className="label">
        <span className="label-text text-gray-500 font-semibold">{label}</span>
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered bg-[#E8F0FE] text-black"
        minLength={minLength}
        // merge react-hook-form + custom onChange
        {...register(name, {
          ...registerOptions,
          onChange: (e) => {
            if (registerOptions?.onChange) {
              registerOptions.onChange(e); 
            }
            if (customOnChange) {
              customOnChange(e); 
            }
          },
        })}
        {...restProps}
      />

      {/* {errors[name] && (
        <p className="text-red-500 mt-1 text-sm">{errors[name].message}</p>
      )} */}
    </div>
  );
};

export default InputField;
