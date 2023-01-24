import classNames from "classnames"
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"
import { Field } from "formik"

const FormField = (props) => {
  const { name, label, className, placeholder, ...otherProps } = props

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <label className={classNames("flex flex-col gap-2", className)}>
          <span className="text-md font-semibold">{label}</span>
          <input
            {...field}
            {...otherProps}
            className="border-2 rounded-md border-gray-400 px-10 py-1 cursor-pointer"
            placeholder={placeholder ?? label}
          />
          {meta.touched && meta.error ? (
            <span className="text-sm text-red-600 flex gap-2 items-center">
              <ExclamationTriangleIcon className="w-6" /> Ce champ est requis
            </span>
          ) : null}
        </label>
      )}
    </Field>
  )
}

export default FormField