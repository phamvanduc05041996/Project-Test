import "./Login.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    //validate
    //submit API

    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="login-container ">
      <div className="header">
        <span>Don't have an account yet ?</span>
        <button onClick={() => navigate("register")}>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">Team One</div>
      <div className="welcome col-4 mx-auto">Hello, who's this ?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group ">
          <label>Email</label>
          <input
            type={"email"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group ">
          <label>Password</label>
          <input
            type={"password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
          />
        </div>

        <div>
          <span className="forgot-password">Forgot password ?</span>
          <div>
            {" "}
            <button className="btn-submit" onClick={() => handleSubmit()}>
              Login to Quizz
            </button>
          </div>

          <div className="back text-center">
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              &#60;&#60; Go to HomePage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
