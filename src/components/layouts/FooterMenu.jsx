import { NavLink } from "../utils/NavLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faLinkedin,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons"

const FooterMenu = (props) => {
  return (
    <footer>
      <div
        className={`flex justify-center bg-[#ffffff] text-[#615043] h-14 border-t-2 border-[#615043] ${props.position} bottom-0 w-full`}
      >
        <div className="hidden lg:block">
          <div className="flex items-center my-4 font-semibold ml-10 gap-10">
            <NavLink href="/help/cgu">
              <div className="text-[12px] hover:text-[#b3825c] hover:scale-110 text-sm">
                CGU
              </div>
            </NavLink>
            <NavLink href="/help/legal">
              <div className="text-[12px] hover:text-[#b3825c] hover:scale-110 text-sm">
                Mentions légales
              </div>
            </NavLink>
            <NavLink href="/products/support/contact">
              <div className="text-[12px] hover:text-[#b3825c] hover:scale-110 text-sm">
                Contact
              </div>
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:ml-auto lg:mx-0 lg:mr-16 lg:gap-10">
          <NavLink href="/">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="h-6 text-primary hover:scale-110"
            />
          </NavLink>
          <NavLink href="/">
            <FontAwesomeIcon
              icon={faInstagram}
              className="h-6 text-primary hover:scale-110"
            />
          </NavLink>
          <NavLink href="/">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="h-6 text-primary hover:scale-110"
            />
          </NavLink>
        </div>
      </div>
    </footer>
  )
}

export default FooterMenu
