const Button = (props) => {
    const {...otherProps} = props

    return (
        <button
            className="w-full text-white bg-primary hover:bg-lightBrown hover:cursor-pointer active:bg-[#615043] border border-black p-3.5 font-semibold rounded-lg uppercase"
            {...otherProps}
        />
    )
}

export default Button
