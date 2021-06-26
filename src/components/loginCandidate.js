import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { api } from "../App";
const LoginCandidate = function ({
  isCandidate,
  setIsCandidate,
  isLoggedIn,
  setIsLoggedIn,
  isEmployer,
  setIsEmployer,
  userData,
  setUserData,
}) {
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
  const onSubmit = async (data) => {
    data.isEmployer = false;
    let res = await api.post("/login", data);

    if (res.data) {
      if (res.data.message) alert(res.data.message);
      else {
        let res2 = await api.get("/checkLogin");
        if (res2.data.username) {
          setIsLoggedIn(true);
          setIsEmployer(false);
          setIsCandidate(true);
          setUserData(res.data);
          history.push("/dashboardCandidate");
        } else alert("Not logged in!");
      }
    }
  };

  return (
    <div className="formLogin">
      <h2 style={{ color: "gray", padding: "50px" }}>
        Login to Job Helper - Candidate
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="labelLoginForm" htmlFor="username">
            Username
          </label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="errorLoginForm">⚠ Please enter your user name</p>
          )}
        </div>

        <div>
          <label className="labelLoginForm" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="errorLoginForm">⚠ Please enter your password</p>
          )}
        </div>

        <input type="submit" />
      </form>
      <h5>
        New User? &nbsp;
        <Link to="/registerCandidate">Register here</Link>
      </h5>
    </div>
  );
};
export default LoginCandidate;
