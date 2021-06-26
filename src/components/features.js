import { Link } from "react-router-dom";
const Features = function () {
  return (
    <div className="container">
      <div className="row middle">
        <p>
          Existing{" "}
          <Link to="/registerCandidate" className="hidelink">
            registered
          </Link>{" "}
          candidates can search for jobs after{" "}
          <Link to="/loginCandidate" className="hidelink">
            logging in
          </Link>{" "}
          and can update their profiles with links to CV etc.
        </p>
        <br />
        <hr />
        <br />
        <p>
          Employers who want talent can also search for candidates for their
          open positions. If you are already registered{" "}
          <Link to="/loginEmployer" className="hidelink">
            Click Here
          </Link>{" "}
          to login, otherwise you may{" "}
          <Link to="/registerEmployer" className="hidelink">
            register
          </Link>{" "}
          as an employer and start posting jobs!
        </p>
      </div>
    </div>
  );
};
export default Features;
