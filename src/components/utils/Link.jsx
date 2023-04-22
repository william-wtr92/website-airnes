import classNames from "classnames"
import NextLink from "next/link"
import { useRouter } from "next/router"

const Link = (props) => {
  const { className, href, ...otherProps } = props
  const { basePath } = useRouter()

  const hrefWithBasePath = href.startsWith("/") ? basePath + href : href

  return (
    <NextLink
      {...otherProps}
      className={classNames("no-underline", className)}
      href={hrefWithBasePath}
    />
  )
}

export default Link
