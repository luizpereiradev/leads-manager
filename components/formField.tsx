import clsx from "clsx";
import InputMask from "react-input-mask";

const FormField = ({
  label,
  name,
  placeholder,
  register,
  errors,
  mask,
}: {
  label: string;
  name: string;
  placeholder: string;
  register: any;
  errors: any;
  mask?: string;
}) => {

  return (
    <fieldset>
      <label
        htmlFor={name}
        className="text-xs font-medium text-gray-700 dark:text-gray-400"
      >
        {label}
      </label>
      {!mask && (
        <input
          {...register(name)}
          id={name}
          type="text"
          placeholder={placeholder}
          className={clsx(
            "mt-1 block w-full rounded-md py-2 px-3",
            "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
            "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
            "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
            { "border-red-500": errors[name] }
          )}
        />
      )}
      {mask && (
        <InputMask
          {...register(name)}
          id={name}
          mask={mask}
          placeholder={placeholder}
          className={clsx(
            "mt-1 block w-full rounded-md py-2 px-3",
            "text-sm text-gray-700 placeholder:text-gray-500 dark:text-gray-400 dark:placeholder:text-gray-600",
            "border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-gray-800",
            "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
            { "border-red-500": errors[name] }
          )}
        />
      )}
      {errors[name] && (
        <span className="text-red-400 text-xs">{errors[name].message}</span>
      )}
    </fieldset>
  );
};

export default FormField;
