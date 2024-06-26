import React, { useState } from "react";
import axios from "axios";
import { URL } from "../config.js";
import { useNavigate, Link} from "react-router-dom";
import * as jose from "jose";

const Login = (props) => {
  const [form, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setValues({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/users/login`, {
        email: form.email.toLowerCase(),
        password: form.password,
      });
      setMessage(response.data.message);
      if (response.data.ok) {
        // here after login was successful we extract the email passed from the server inside the token
        let decodedToken = jose.decodeJwt(response.data.token);
        // and now we now which user is logged in in the client so we can manipulate it as we want, like fetching data for it or we can pass the user role -- admin or not -- and act accordingly, etc...
        console.log(
          "Email extracted from the JWT token after login: ",
          decodedToken.userEmail
        );
        setTimeout(() => {
          props.login(response.data.token, response.data.user);
          navigate("/blog");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (<div>
    <h1 className="welcome_message">Welcome Back to BitsOfCryptos!</h1>
    <p className="info_text">
Join our community and start exploring the exciting world of cryptocurrency.
</p>
<p className="info_text">
Enter your credentials below to continue your journey with us.
 Discover the latest in cryptocurrency, manage your portfolio, and stay ahead in the world of digital finance.
</p>
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="form_container"
    >
      <label>Email</label>
      <input name="email" type="email" />
      <label>Password</label>
      <input name="password" type="password" />
      <button>login</button>
      <div className="message">
        <h4>{message}</h4>
      </div>
    </form>
<p>Not a member yet?
  <Link to={`/register`} >
  <span className="link_to_register"> Register now</span>
            </Link> </p>
    </div>
  );
};

export default Login;
