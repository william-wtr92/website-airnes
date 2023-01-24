const Button = (props) => {
  const { className, ...otherProps } = props

  return (
    <button
      className="w-full text-[#ffff] bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black p-3.5 font-semibold rounded-md"
      {...otherProps}
    />
  )
}

export default Button
