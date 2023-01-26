import classNames from "classnames";

const Button = (props) => {
    const {className, ...otherProps} = props

    return (
        <button
            className={classNames("text-white bg-primary hover:bg-lightBrown hover:cursor-pointer active:bg-[#615043] border border-black p-3.5 font-semibold rounded-lg uppercase", className)}
            {...otherProps}
        />
    )
}

export default Button
