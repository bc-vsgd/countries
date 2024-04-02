import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <div className="flex-row">
        <span>
          Made by <b>Benoît Charles</b>
        </span>
        <a href="https://github.com/bc-vsgd" target="_blank">
          <FontAwesomeIcon icon="fa-brands fa-github" className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/beno%C3%AEt-charles-b641672a6/"
          target="_blank"
        >
          <FontAwesomeIcon icon="fa-brands fa-linkedin" className="icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
