const Button = (props) => {
    const { className, ...otherProps } = props

    return (
        <button
            className="w-full bg-[#709861] hover:bg-[#646E4E]
             active:bg-[#615043] border border-black p-3.5 font-semibold text-white"
            {...otherProps}
        />
    )
}

export default Button