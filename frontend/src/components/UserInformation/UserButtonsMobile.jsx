import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useScrollToTop from "../../hooks/useScrollToTop";
import { faHeart, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UsersContent } from "./UserInformation";
import { useAuthorization } from "../../contexts/AuthorizationContext";

const UserButtonsMobile = ({ goBack }) => {
  const { handleClick } = useScrollToTop("smooth");
  const { closeAuthorization } = useAuthorization(false);

  return (
    <UsersContent>
      <div>
        <div id="BurgerIcon1" onClick={goBack}>
          <FontAwesomeIcon className="BurgerIcon" icon={faUserCircle} />
        </div>
      </div>
      <div onClick={handleClick}>
        <Link onClick={closeAuthorization} to="/favorites">
          <FontAwesomeIcon className="BurgerIcon" icon={faHeart} />
        </Link>
      </div>
    </UsersContent>
  );
};

export default UserButtonsMobile;
