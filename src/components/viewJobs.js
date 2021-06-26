import { useEffect, useState, Fragment } from "react";
import { api } from "../App";
const ViewJobs = function ({ userData }) {
  const [isFetching, setIsFetching] = useState(true);
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
        <div className="col-3">
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
    setIsFetching(true);
    let data = { companyname: userData.companyname };
    try {
      let jobsResponse = await api.post("/jobsByCompany", data);
      if (jobsResponse.data.message == false) {
        alert(
          "There was an error in fetching your posted jobs, please try again in sometime..."
        );
      } else {
        setJobs(jobsResponse.data);
      }
      setIsFetching(false);
    } catch (err) {
      alert(
        "There was an error in fetching your posted jobs, please try again in sometime..."
      );
      setIsFetching(false);
    }
  }, []);
  return (
    <div className="container">
      <p style={{ color: "white" }}>Search and Apply to jobs - Job Helper</p>

      {isFetching ? (
        <p>Please wait while we fetch jobs posted by you...</p>
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
        <p>There are no jobs by you at the moment</p>
      )}
    </div>
  );
};
export default ViewJobs;
