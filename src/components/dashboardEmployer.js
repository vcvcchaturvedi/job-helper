import React, { useEffect, useState } from "react";
const DashboardEmployer = function ({ userData }) {
  return (
    <div>
      <p style={{ "padding-top": "30px" }}>
        <b>{userData.companyname}</b>
      </p>
      <br />
      <p>
        Hello, {userData.firstname} {userData.lastname} ! Select a link on top
        to post a job, view jobs posted or view job applications against your
        posted job.
      </p>
    </div>
  );
};
export default DashboardEmployer;
