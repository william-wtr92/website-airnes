import classNames from "classnames"
import { ExclamationTriangleIcon, EyeIcon } from "@heroicons/react/24/solid"
import { Field } from "formik"
import { useState } from "react"

const FormField = (props) => {
  const { name, label, className, placeholder, type, tag, ...otherProps } =
    props
  const [show, setShow] = useState(type)

  const HandlePassword = () => {
    setShow((show) => (show === "password" ? "text" : "password"))
  }

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <label className={classNames("flex flex-col", className)}>
          <span className="text-md">{label}</span>
          <div className="flex border shadow rounded-md px-5 py-3 cursor-pointer">
            {tag === "textarea" ? (
              <textarea
                {...field}
                {...otherProps}
                placeholder={placeholder ?? label}
                className="w-full focus:outline-none bg-none"
              />
            ) : (
              <input
                {...field}
                {...otherProps}
                type={show}
                placeholder={placeholder ?? label}
                className="w-full focus:outline-none bg-none"
              />
            )}

            {type === "password" ? (
              <EyeIcon className="w-6 ml-4" onClick={HandlePassword} />
            ) : (
              ""
            )}
          </div>
          {meta.touched && meta.error ? (
            <span className="text-sm text-red-600 flex gap-2 items-center">
              <ExclamationTriangleIcon className="w-6" />
              {type === "password" ? meta.error : "Ce champ est requis"}
            </span>
          ) : null}
        </label>
      )}
    </Field>
  )
}

export default FormField
