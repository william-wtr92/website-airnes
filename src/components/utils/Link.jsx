import classNames from "classnames"
import NextLink from "next/link"

const Link = (props) => {
  const { className, ...otherProps } = props

  return (
    <NextLink
      {...otherProps}
      className={classNames("no-underline", className)}
    />
  )
}

export default Link