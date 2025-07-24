import { useState } from "react";
import axios from "axios";
import { urlToBackend } from "../repeatedValues/urlToBackend";
import { statusValue } from "../repeatedValues/statusValues";

export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function createUser() {
    axios
      .post(`${urlToBackend}/users/registerUser`, { username: username, password: password })
      .then((res) => {
        console.log(res.data);

        if (res.data === statusValue) {
          window.location.pathname = "/login";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} placeholder="username"></input>

      <input onChange={(e) => setPassword(e.target.value)} placeholder="password"></input>

      <button onClick={createUser}>Register!</button>
    </div>
  );
}
