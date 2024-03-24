import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div>HEADER</div>
      <button
        onClick={() => {
          navigate("/countries");
        }}
      >
        Home
      </button>
    </header>
  );
};

export default Header;
