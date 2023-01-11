import { NavLink } from "./NavLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faFacebookF
} from "@fortawesome/free-brands-svg-icons";

const FooterMenu = () => {
  return (
    <footer>
      <div className="FooterMenu flex bg-[#709861] h-10 justify-start absolute bottom-0 w-full">
        <div className="FooterText flex mr-auto ml-4 mt-2 gap-4 text-white font-ligth">
          <NavLink href="/" >
            <div className="hover:text-[#97c186] hover:scale-110">
             CGU 
            </div>
          </NavLink>
          <NavLink href="/">
            <div className="hover:text-[#97c186] hover:scale-110">
             Mentions légales
            </div>
          </NavLink>
          <NavLink href="/">
            <div className="hover:text-[#97c186] hover:scale-110">
             Contact
            </div>
          </NavLink>
        </div>
        <div className="FooterLink flex gap-6 mr-10 mt-2">
          <NavLink href="/">
            <FontAwesomeIcon icon={faLinkedin} className="h-6 text-white hover:scale-110"/>
          </NavLink>
          <NavLink href="/">
            <FontAwesomeIcon icon={faInstagram} className="h-6 text-white hover:scale-110"/>
          </NavLink>
          <NavLink href="/">
            <FontAwesomeIcon icon={faFacebookF} className="h-6 text-white hover:scale-110"/>
          </NavLink>
        </div>
      </div> 
    </footer>
  )
}

export default FooterMenu