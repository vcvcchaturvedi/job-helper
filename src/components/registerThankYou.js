import logo from ".././assets/images/logoJobHelper.png";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useEffect } from "react";
const ThankYou = function ({ dashboardCandidateLink, dashboardEmployerLink }) {
  const [time, setTime] = useState(10);
  let history = useHistory();
  let params = useParams();
  useEffect(() => {
    setTimeout(() => {
      if (params.isCandidate == "true") {
        history.push("/loginCandidate");
        dashboardCandidateLink.current.click();
      } else {
        history.push("/loginEmployer");
        dashboardEmployerLink.current.click();
      }
    }, 10000);
    setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  }, []);
  return (
    <div className="row">
      <p>
        Thank you for registering on Job Portal as a{" "}
        {params.isCandidate == "true" ? "job seeker" : "company"}! You will be
        redirected to login in {time} seconds...
      </p>
      <img src={logo} alt="imgLogo"></img>
    </div>
  );
};
export default ThankYou;
