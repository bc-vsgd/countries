import { useNavigate } from "react-router-dom";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex-row">
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-house" className="icon" />
        </button>
      </div>
      <div className="flex-row">
        <p>COUNTRIES</p>
      </div>
    </header>
  );
};

export default Header;
