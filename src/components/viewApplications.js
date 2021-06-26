import { useEffect, useState, Fragment } from "react";
import { api } from "../App";
const ViewApplications = function ({ userData }) {
  const [isFetching, setIsFetching] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const Candidate = function ({ candidate, index }) {
    return (
      <div className="row">
        <div className="col-1">
          <p>{index + 1}</p>
        </div>
        <div className="col-2">
          <p>{candidate.firstname}</p>
        </div>
        <div className="col-2">
          <p>{candidate.lastname}</p>
        </div>
        <div className="col-3">
          <p>{candidate.emailid}</p>
        </div>
        <div className="col-4">
          <p>{candidate.jobTitle}</p>
        </div>
      </div>
    );
  };
  useEffect(async () => {
    setIsFetching(true);
    let data = { companyname: userData.companyname };
    let profiles = [];
    try {
      let responseData = await api.post("/jobsByCompany", data);

      if (responseData.data.message == false) {
        alert(
          "There was some error in fetching candidates details, please try again in sometime..." +
            responseData.data.message
        );
        setIsFetching(false);
      } else {
        for (let i = 0; i < responseData.data.length; i++) {
          let data = { applicants: responseData.data[i].applicants };
          const profilesData = await api.post("/getProfiles", data);

          for (let j = 0; j < profilesData.data.length; j++) {
            if (profilesData.data[j]) {
              profilesData.data[j].jobTitle = responseData.data[i].jobTitle;
              profiles.push(profilesData.data[j]);
            }
          }
        }

        setIsFetching(false);
      }
      setCandidates(profiles);
    } catch (err) {
      alert(
        "There was some error in fetching candidates details, please try again in sometime..." +
          JSON.stringify(err)
      );
      setIsFetching(false);
    }
  }, []);
  return !isFetching ? (
    <div className="container">
      <div className="row">
        <div className="col-1">
          <p style={{ color: "yellow" }}>S.No</p>
        </div>
        <div className="col-2">
          <p style={{ color: "yellow" }}>First Name</p>
        </div>
        <div className="col-2">
          <p style={{ color: "yellow" }}>Last Name</p>
        </div>
        <div className="col-3">
          <p style={{ color: "yellow" }}>Email Id</p>
        </div>
        <div className="col-4">
          <p style={{ color: "yellow" }}>Job Title Applied for</p>
        </div>
      </div>
      {candidates.map((candidate, i) => (
        <Candidate candidate={candidate} index={i} />
      ))}
    </div>
  ) : (
    <p>Please wait while we fetch the candidates list...</p>
  );
};
export default ViewApplications;
