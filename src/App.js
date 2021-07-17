import "./App.css";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Home from "./components/home";
import Features from "./components/features";
import LoginCandidate from "./components/loginCandidate";
import LoginEmployer from "./components/loginEmployer";
import RegisterEmployer from "./components/registerEmployer";
import RegisterCandidate from "./components/registerCandidate";
import ThankYou from "./components/registerThankYou";
import ViewApplications from "./components/viewApplications";
import ViewJobs from "./components/viewJobs";
import PostJob from "./components/postJob";
import DashboardEmployer from "./components/dashboardEmployer";
import DashboardCandidate from "./components/dashboardCandidate";
import ViewAllJobs from "./components/viewAllJobs";
export const api = axios.create({
  baseURL: "https://jobhelper-be.herokuapp.com/",
  withCredentials: true,
});

function App() {
  const history = createBrowserHistory();

  const dashboardEmployerLink = useRef(null);
  const dashboardCandidateLink = useRef(null);
  const homeLink = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(async () => {
    let res = await api.get("/checkLogin");
    if (res.data.username) {
      setIsLoggedIn(true);
      setUserData(res.data);
      if (res.data.companyname) {
        setIsCandidate(false);
        setIsEmployer(true);
        history.push("/dashboardEmployer");
        dashboardEmployerLink.current.click();
      } else {
        setIsEmployer(false);
        setIsCandidate(true);
        history.push("/dashboardCandidate");
        dashboardCandidateLink.current.click();
      }
    }
  }, []);
  const logout = async () => {
    let res = await api.get("/logout");
    if (res.data.message == "Logged Out!") {
      setIsLoggedIn(false);
      setIsCandidate(false);
      setIsEmployer(false);
      history.push("/");
      homeLink.current.click();
    } else alert("Error in logging out..Please try again");
  };
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/">
              <label className="navbar-brand float-left" href="#">
                Job Helper - For Employers / Job Seekers
              </label>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav">
                {!isLoggedIn ? (
                  <Fragment>
                    <Link to="/" className="hidelink" ref={homeLink}>
                      <li className="nav-item active">
                        <div className="nav-link">Home</div>
                      </li>
                    </Link>
                    <Link to="/features" className="hidelink">
                      <li className="nav-item">
                        <div className="nav-link">Features</div>
                      </li>
                    </Link>
                    <Link to="/loginCandidate" className="hidelink">
                      <li className="nav-item">
                        <div className="nav-link">Candidate</div>
                      </li>
                    </Link>
                    <Link to="/loginEmployer" className="hidelink">
                      <li className="nav-item">
                        <div className="nav-link">Employer</div>
                      </li>
                    </Link>
                  </Fragment>
                ) : isLoggedIn && isEmployer ? (
                  <Fragment>
                    <Link
                      to="/dashboardEmployer"
                      className="hidelink"
                      ref={dashboardEmployerLink}
                    >
                      <li className="nav-item">
                        <div className="nav-link">Dashboard</div>
                      </li>
                    </Link>
                    <Link to="/postJob" className="hidelink">
                      <li className="nav-item">
                        <div className="nav-link">Post A Job</div>
                      </li>
                    </Link>
                    <Link to="/viewJobs" className="hidelink">
                      <li className="nav-item">
                        <div className="nav-link">View Posted Jobs</div>
                      </li>
                    </Link>
                    <Link to="/viewApplications" className="hidelink">
                      <li className="nav-item">
                        <div className="nav-link">View Applications</div>
                      </li>
                    </Link>

                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-secondary"
                        onClick={logout}
                      >
                        <FontAwesomeIcon icon={faUser} /> &nbsp; Logout
                      </button>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link
                      to="/dashboardCandidate"
                      className="hidelink"
                      ref={dashboardCandidateLink}
                    >
                      <li className="nav-item">
                        <div className="nav-link">Dashboard</div>
                      </li>
                    </Link>
                    <Link to="/viewAllJobs" className="hidelink">
                      <li className="nav-item">
                        <div className="nav-link">View and Apply</div>
                      </li>
                    </Link>
                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-secondary"
                        onClick={logout}
                      >
                        <FontAwesomeIcon icon={faUser} /> &nbsp; Logout
                      </button>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </nav>
        </header>
        <Switch>
          {!isLoggedIn ? (
            <Fragment>
              <Route exact path="/loginEmployer">
                <LoginEmployer
                  isCandidate={isCandidate}
                  setIsCandidate={setIsCandidate}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  isEmployer={isEmployer}
                  setIsEmployer={setIsEmployer}
                  userData={userData}
                  setUserData={setUserData}
                />
              </Route>
              <Route exact path="/loginCandidate">
                <LoginCandidate
                  isCandidate={isCandidate}
                  setIsCandidate={setIsCandidate}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  isEmployer={isEmployer}
                  setIsEmployer={setIsEmployer}
                  userData={userData}
                  setUserData={setUserData}
                />
              </Route>

              <Route exact path="/features">
                <Features />
              </Route>
              <Route exact path="/registerEmployer">
                <RegisterEmployer />
              </Route>
              <Route exact path="/registerCandidate">
                <RegisterCandidate />
              </Route>
              <Route path="/registerThankYou/:isCandidate">
                <ThankYou
                  dashboardCandidateLink={dashboardCandidateLink}
                  dashboardEmployerLink={dashboardEmployerLink}
                />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Fragment>
          ) : isLoggedIn && isEmployer ? (
            <Fragment>
              <Route exact path="/dashboardEmployer">
                <DashboardEmployer userData={userData} />
              </Route>
              <Route exact path="/postJob">
                <PostJob userData={userData} />
              </Route>
              <Route exact path="/viewJobs">
                <ViewJobs userData={userData} />
              </Route>
              <Route exact path="/viewApplications">
                <ViewApplications userData={userData} />
              </Route>
            </Fragment>
          ) : isLoggedIn && isCandidate ? (
            <Fragment>
              <Route exact path="/viewAllJobs">
                <ViewAllJobs userData={userData} setUserData={setUserData} />
              </Route>

              <Route exact path="/dashboardCandidate">
                <DashboardCandidate userData={userData} />
              </Route>
            </Fragment>
          ) : (
            ""
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
