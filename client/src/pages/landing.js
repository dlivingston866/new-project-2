import React, { useState } from "react";
import axios from "axios";
import "./landing.scss";

function Landing() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "/register",
    }).then((res) => console.log(res));
  };
  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "/login",
    }).then((res) => {
      console.log(res);
      if (res.data !== "No User Exists") {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("username", res.data.username);
        window.location = "/home";
      }
    });
  };
  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };
  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={register}>
          Submit
        </button>
      </div>
      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={login}>
          Submit
        </button>
      </div>
      <div>
        <h1>Get User</h1>
        <button className="btn btn-primary" onClick={getUser}>
          Submit
        </button>

        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div>
    </div>
  );
}
export default Landing;
