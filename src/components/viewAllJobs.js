import { useEffect, useState, Fragment } from "react";
import { api } from "../App";
const ViewAllJobs = function ({ userData, setUserData }) {
  const [isFetching, setIsFetching] = useState(true);
  const [jobs, setJobs] = useState([]);
  const Job = function ({ job, index }) {
    const [applying, setApplying] = useState(false);
    const Apply = async function () {
      let data = { _id: job._id, applicantID: userData._id };
      try {
        let response = await api.post("/apply", data);
        if (response.data) {
          if (response.data.message == false)
            alert("Error while applying to job, please try again!");
          else {
            let jobsModified = [...jobs];
            const appliedjobs = "appliedjobs";
            jobsModified[index - 1].applicants.push(data.applicantID);
            setUserData((userData) => ({
              ...userData,
              appliedjobs: [...userData.appliedjobs, data._id],
            }));
            setJobs(jobsModified);
            alert(
              "Applied to " + job.postedBy + " for job " + job.jobTitle + " !"
            );
          }
        } else alert("Error while applying to job, please try again!");
      } catch (err) {
        alert("Error while applying to job, please try again!");
      }
    };
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
        <div className="col-3">
          <p>{job.description}</p>
        </div>
        <div className="col-1">
          <p>{job.ctcpamin}</p>
        </div>
        <div className="col-1">
          <p>{job.ctcpamax}</p>
        </div>
        <div className="col-1">
          {job.applicants.includes(userData._id) ? (
            <p>Applied</p>
          ) : (
            <button className="btn btn-primary" onClick={Apply}>
              Apply
            </button>
          )}
        </div>
      </div>
    );
  };
  useEffect(async () => {
    setIsFetching(true);
    try {
      let jobsResponse = await api.get("/alljobs");
      setJobs(jobsResponse.data);
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
    }
  }, []);
  return (
    <div className="container">
      <p style={{ color: "white" }}>Search and Apply to jobs - Job Helper</p>

      {isFetching ? (
        <p>Please wait while we fetch jobs posted by all employees...</p>
      ) : jobs.length > 0 ? (
        <Fragment>
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
            <div className="col-3">
              <p style={{ color: "yellow" }}>Job Description</p>
            </div>
            <div className="col-1">
              <p style={{ color: "yellow" }}>CTC (Lacs per annum) - Minimum</p>
            </div>
            <div className="col-1">
              <p style={{ color: "yellow" }}>CTC (Lacs per annum) - Maximum</p>
            </div>
          </div>
          {jobs.map((job, i) => (
            <Job job={job} index={i + 1} />
          ))}
        </Fragment>
      ) : (
        <p>There are no jobs at the moment, please try again in sometime...</p>
      )}
    </div>
  );
};
export default ViewAllJobs;
