import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { api } from "../App";
const PostJob = function ({ userData }) {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const onSubmit = async (formData) => {
    formData.postedBy = userData.companyname;
    try {
      let id = await api.post("/postjob", formData);
      if (id != "") {
        setSuccess("Job posted successfully!");
        setTimeout(() => history.push("/dashboardEmployer"), 2500);
      } else
        setErr("There was some error in posting your job, please try again...");
    } catch (err) {
      setErr("There was some error in posting your job, please try again...");
    }
  };

  return (
    <div className="formLogin">
      <h2 style={{ color: "green" }}>{success}</h2>
      <h2 style={{ color: "red" }}>{err}</h2>
      <h2 style={{ color: "orange", padding: "50px" }}>Post a job -</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="labelLoginForm" htmlFor="jobTitle">
            Job Title
          </label>
          <input
            name="jobTitle"
            type="text"
            placeholder="Enter title of the job"
            {...register("jobTitle", { required: true })}
          />
          {errors.jobTitle && (
            <p className="errorLoginForm">⚠ Please enter the job's title</p>
          )}
        </div>

        <div>
          <label className="labelLoginForm" htmlFor="category">
            Category of the job sector
          </label>
          <input
            name="category"
            type="text"
            placeholder="Enter category of the job sector"
            {...register("category", { required: true })}
          />
          {errors.category && (
            <p className="errorLoginForm">⚠ Please enter job's category</p>
          )}
        </div>
        <div>
          <label className="labelLoginForm" htmlFor="description">
            Description of the job role
          </label>
          <input
            name="description"
            type="text"
            placeholder="Enter description of the job"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="errorLoginForm">⚠ Please enter job's description</p>
          )}
        </div>
        <div>
          <label className="labelLoginForm" htmlFor="ctcpamin">
            Min CTC per annum of the position
          </label>
          <input
            name="ctcpamin"
            type="text"
            placeholder="Enter min CTC per annum"
            {...register("ctcpamin", { required: true })}
          />
          {errors.ctcpamin && (
            <p className="errorLoginForm">
              ⚠ Please enter this job's minimum CTC
            </p>
          )}
        </div>
        <div>
          <label className="labelLoginForm" htmlFor="ctcpamax">
            Max CTC per annum of the position
          </label>
          <input
            name="ctcpamax"
            type="text"
            placeholder="Enter max CTC per annum"
            {...register("ctcpamax", { required: true })}
          />
          {errors.ctcpamax && (
            <p className="errorLoginForm">
              ⚠ Please enter this job's maximum CTC
            </p>
          )}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
export default PostJob;
