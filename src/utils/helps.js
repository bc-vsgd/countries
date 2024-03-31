// Installation des dépendances du package

// Pour importer {library}
// yarn add @fortawesome/fontawesome-svg-core
// Solid icons
// yarn add @fortawesome/free-solid-svg-icons
// Regular icons
// yarn add @fortawesome/free-regular-svg-icons
// Brands icons
// yarn add @fortawesome/free-brands-svg-icons

// Pour importer {FontAwesomeIcon} dans le composant
// yarn add @fortawesome/react-fontawesome

// Commande totale:
// yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome

// ------------------------------------------------------------------------------------------

// App.jsx

import "./App.css";
// Components
import Icon from "./Icon";

// Icons import
import { library } from "@fortawesome/fontawesome-svg-core";
// Solid icons
import {
  faEnvelope,
  faKey,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
// Brands icons
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// Regular icons
import { faUser } from "@fortawesome/free-regular-svg-icons";

library.add(faEnvelope, faKey, faListAlt, faUser, faGithub, faLinkedin);

function App() {
  return (
    <>
      <Icon />
    </>
  );
}

// export default App;

// -----------------------------------------------------------------------------------------

// Component
// Icon.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = () => {
  return (
    <div>
      {/* Solid icons */}
      <FontAwesomeIcon icon="envelope" />
      <FontAwesomeIcon icon="key" />
      <FontAwesomeIcon icon="list-alt" />
      {/* Regular icon */}
      <FontAwesomeIcon icon="fa-regular fa-user" />
      {/* Brands icons */}
      <FontAwesomeIcon icon="fa-brands fa-github" />
      <FontAwesomeIcon icon="fa-brands fa-linkedin" />
    </div>
  );
};

// export default Icon;
