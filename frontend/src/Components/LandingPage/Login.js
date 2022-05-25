import {
  Button,
} from "@mui/material";
import "./Login.css";
import { common } from "@mui/material/colors";
import { postLogin } from "../../store/asyncMethods/AuthMethods";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
import { Redirect, Link, useHistory } from "react-router-dom";
import { CLOSE_LOGIN_ERRORS } from "../../store/types/AuthTypes";
const Login = (props) => {
  const { push } = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(null);
  // Dispatch
  const dispatch = useDispatch();
  const { loginErrors, loading, user, token } = useSelector(
    (state) => state.AuthReducer
  );
  //Username
  const usernameOnChangeHandler = (event) => {
    //add possible validations/other processes
    setEmail(event.target.value);
  };

  //Password
  const passwordOnChangeHandler = (event) => {
    //add possible validations/other processes
    setPassword(event.target.value);
  };

  //Handle Submit
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await dispatch(postLogin(email, password));
    //add logic for user log in
  };

  //Remember me
  const rememberMeOnChangeHandler = (event) => {
    setRememberMe(event.target.checked);
  };
  useEffect(() => {
    if (loginErrors.length > 0) {
      loginErrors.map((error) => {
        toast.error(error.msg);
      });
      dispatch({ type: CLOSE_LOGIN_ERRORS });
    }
  }, [loginErrors]);
  const handleForgotPassword = (e) => {
    e.preventDefault();
    push("/forgotPassword");
  };

  const style = theme => ({
    notchedOutline: {
      borderColor: "white !important"
    }
  })
  return (
    <div className="login-form" >
      <div className="login-heading">
      <h1>
        Skill-Media
      </h1>
      </div>
    <form className="login-form-main" onSubmit={onSubmitHandler}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { marginTop: "50px" } }}
      />
      <div className="login-email">
        <input type="text" className="group__control"  name="email" value={email} placeholder="Enter Email" onChange={e=>setEmail(e.target.value)} />
      </div>
    <div className="login-password">
      <input type="password" className="group__control"  name="password" value={password} placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} />
    </div>
    <div className="submit-btn">
      <input className="login-submit" type="submit" placeholder={loading ? <>...</> : <>LOGIN</>} />
    </div>
    {/* <div className="forgetPassword">
      <button  className="login-submit" onClick={handleForgotPassword}>Forgot Password?</button>
    </div> */}
    </form>
    </div>
  );
};

export default Login;
