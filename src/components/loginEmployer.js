import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { api } from "../App";
const LoginEmployer = function ({
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
  const onSubmit = async (formData) => {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // alert(JSON.stringify(config));
    const params = new URLSearchParams();
    params.append("username", formData.username);
    params.append("password", formData.password);
    let data = JSON.stringify({
      username: formData.username,
      password: formData.password,
    });
    formData.isEmployer = true;
    let res = await api.post("/login", formData); //, config);
    // let res = await api.post({
    //   url: "/login",
    //   method: "method",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    //   },
    //   data: formData,
    // });
    // alert(JSON.stringify(res));
    if (res.data) {
      if (res.data.message) alert(res.data.message);
      else {
        let res2 = await api.get("/checkLogin");
        if (res2.data.username) {
          if (!res2.data.companyname) {
            alert("Please login from Candidate Login link!");
            return;
          }
          setIsLoggedIn(true);
          setIsEmployer(true);
          setIsCandidate(false);
          setUserData(res.data);
          history.push("/dashboardEmployer");
        } else alert("Not logged in!");
      }
    }
  };

  return (
    <div className="formLogin">
      <h2 style={{ color: "gray", padding: "50px" }}>
        Login to Job Helper - Employer
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
        New Company on Job Helper? &nbsp;
        <Link to="/registerEmployer">Register here</Link>
      </h5>
    </div>
  );
};
export default LoginEmployer;
