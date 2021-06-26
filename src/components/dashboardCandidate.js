import React, { useEffect, useState, Fragment } from "react";
import { api } from "../App";
const DashboardCandidate = function ({ userData }) {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [jobs, setJobs] = useState([]);
  const Job = function ({ job, index }) {
    return (
      <div className="row">
        <div className="col-1">
          <p>{index}</p>
        </div>
        <div className="col-1">
          <p>{job.postedBy}</p>
        </div>
        <div className="col-2">
          <p>{job.jobTitle}</p>
        </div>
        <div className="col-2">
          <p>{job.category}</p>
        </div>
        <div className="col-4">
          <p>{job.description}</p>
        </div>
        <div className="col-1">
          <p>{job.ctcpamin}</p>
        </div>
        <div className="col-1">
          <p>{job.ctcpamax}</p>
        </div>
      </div>
    );
  };
  useEffect(async () => {
    setIsFetchingData(true);
    let jobsApplied = userData.appliedjobs;
    try {
      let res = await api.post("/getJobsApplied", jobsApplied);
      if (res.data) {
        if (res.data.message) {
          alert(
            "Error while fetching user data...Please try again in sometime...Error: " +
              JSON.stringify(res.data.message)
          );
          setIsFetchingData(false);
        } else {
          setJobs(res.data);
          setIsFetchingData(false);
        }
      }
    } catch (err) {
      alert(
        "Error while fetching user data...Please try again in sometime..." +
          JSON.stringify(err)
      );
      setIsFetchingData(false);
    }
  }, []);

  return (
    <div>
      {isFetchingData ? (
        <p>Please wait while we fetch your data...</p>
      ) : jobs.length > 0 ? (
        <Fragment>
          <p>
            Hello, {userData.firstname} {userData.lastname} ! You have applied
            to below jobs on Job Helper
          </p>
          <div className="container">
            <div className="row">
              <div className="col-1">
                <p style={{ color: "yellow" }}>S.No</p>
              </div>
              <div className="col-1">
                <p style={{ color: "yellow" }}>Company Name</p>
              </div>
              <div className="col-2">
                <p style={{ color: "yellow" }}>Job Title</p>
              </div>
              <div className="col-2">
                <p style={{ color: "yellow" }}>Sector</p>
              </div>
              <div className="col-4">
                <p style={{ color: "yellow" }}>Job Description</p>
              </div>
              <div className="col-1">
                <p style={{ color: "yellow" }}>
                  CTC (Lacs per annum) - Minimum
                </p>
              </div>
              <div className="col-1">
                <p style={{ color: "yellow" }}>
                  CTC (Lacs per annum) - Maximum
                </p>
              </div>
            </div>
            {jobs.map((job, i) => (
              <Job job={job} index={i + 1} />
            ))}
          </div>
        </Fragment>
      ) : (
        <p>
          "You have not applied to any jobs, please select View and Apply to see
          jobs and apply!"
        </p>
      )}
    </div>
  );
};
export default DashboardCandidate;
