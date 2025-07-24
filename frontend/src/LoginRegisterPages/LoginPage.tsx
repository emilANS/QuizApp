import axios from "axios";
import { useState } from "react";
import { urlToBackend } from "../repeatedValues/urlToBackend";

import { UseAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = UseAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function loginUser() {
    axios
      .post(`${urlToBackend}/users/loginUser`, { username: username, password: password })
      .then((res) => {
        console.log(res.data);

        if (res.data === "user_login_success") {
          login();
          navigate("/create-quiz");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <input onChange={(event) => setUsername(event.target.value)} placeholder="username"></input>

      <input onChange={(event) => setPassword(event.target.value)} placeholder="password"></input>

      <button onClick={loginUser}>Login!</button>
    </div>
  );
}
