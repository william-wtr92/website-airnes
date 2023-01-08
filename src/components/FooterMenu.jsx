import { NavLink } from "./NavLink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faFacebookF
} from "@fortawesome/free-brands-svg-icons";

const FooterMenu = () => {
  return (
    <div className="flex bg-[#709861] h-10 justify-start absolute bottom-0 w-full">
      <div className="flex mr-auto ml-4 mt-2 gap-4 text-white font-ligth">
        <NavLink href="/">CGU</NavLink>
        <NavLink href="/">Mentions Légales</NavLink>
        <NavLink href="/">Contact</NavLink>
      </div>
      <div className="flex gap-6 mr-10 mt-2">
        <NavLink href="/">
          <FontAwesomeIcon icon={faLinkedin} className="h-6 text-white"/>
        </NavLink>
        <NavLink href="/">
          <FontAwesomeIcon icon={faInstagram} className="h-6 text-white"/>
        </NavLink>
        <NavLink href="/">
          <FontAwesomeIcon icon={faFacebookF} className="h-6 text-white"/>
        </NavLink>
      </div>
    </div> 
  )
}

export default FooterMenu