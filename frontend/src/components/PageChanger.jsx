import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export function PageChanger({ currentPage }) {
  // Function to move to between pages
  let navigate = useNavigate();
  const routeChangePage = () => {
    navigate(`/page${otherPage}`);
  };

  // Not optimal page modifier (but does the work)
  let otherPage = "1";
  if (currentPage == "1") {
    otherPage = "2";
  }

  return (
    <div className="container text-center">
      <div className="card">
        <button onClick={routeChangePage}>Go to Page {otherPage}!</button>
        <br></br>
        <p>This is my own page-changer reusable component!</p>
      </div>
    </div>
  );
}

// To enable static typing for my props for the PageChanger :)
PageChanger.propTypes = {
  currentPage: PropTypes.string.isRequired,
};
