import logo from ".././assets/images/logoJobHelper.png";
import { Link } from "react-router-dom";
const Home = function () {
  return (
    <div className="container">
      <div className="row middle">
        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2 ">
          <p>
            Get your dream job with our best in class <b>Job Helper</b> portal
            that gives you the power to connect with companies of your choice
            and also apply to them!
          </p>
        </div>
        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 mt-2">
          <img src={logo} className="img-fluid" alt="logo" />
        </div>
        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 p-2 ">
          <p>
            We also have the best companies on board with us, if you would like
            to register as an employer,{" "}
            <Link to="/registerEmployer" className="hidelink link">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
