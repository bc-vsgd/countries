// Home page: automatically navigates to Sorted Countries Page (sorted by ascending name)

import { Navigate } from "react-router-dom";

const HomePage = () => {
  return <Navigate to="/countries/sort?name=asc&page=1" />;
};

export default HomePage;
