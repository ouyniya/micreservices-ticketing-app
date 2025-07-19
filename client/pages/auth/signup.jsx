import axios from "axios";
import { useState } from "react";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);

    await axios.post('/api/users/signup', {
      email, password
    })
  };

  return (
    <div
      className="card text-center"
      style={{ width: "550px", top: "24px", margin: "auto" }}
    >
      <div className="card-header">Sign Up</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group mt-2">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary mt-2">Sign up</button>
        </form>
      </div>
      <div className="card-footer text-body-secondary">
        Made with 💙 by nysdev.com
      </div>
    </div>
  );
};
