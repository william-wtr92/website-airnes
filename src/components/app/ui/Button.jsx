import classNames from "classnames"

const variants = {
  primary:
    "text-white bg-primary hover:cursor-pointer active:bg-[#615043] border border-black p-3.5 font-semibold rounded-lg uppercase",
  suppr:
    "text-white bg-[#FF0000] hover:cursor-pointer border p-2 font-semibold rounded-lg",
}
const Button = (props) => {
  const { variant = "primary", className, ...otherprops } = props

  return (
    <button
      {...otherprops}
      className={classNames(variants[variant], className)}
    />
  )
}

export default Button
