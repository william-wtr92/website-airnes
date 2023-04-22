import { useRouter } from "next/router"
import Link from "./Link"
import classNames from "classnames"

export const NavLink = (props) => {
  const router = useRouter()
  const { asPath, locale } = router

  const generateLocalizedHref = (href) => {
    if (!locale) {
      return href
    }

    let pName = router.pathname
    Object.keys(router.query).forEach((k) => {
      if (k === "locale") {
        pName = pName.replace(`[${k}]`, locale)

        return
      }

      pName = pName.replace(`[${k}]`, router.query[k])
    })

    if (href.indexOf(`/${locale}`) < 0) {
      href = `/${locale}${href}`
    }

    return href
  }

  const localizedHref = generateLocalizedHref(props.href)

  return (
    <Link
      {...props}
      href={localizedHref}
      className={classNames({
        underline: asPath === localizedHref,
      })}
    />
  )
}
