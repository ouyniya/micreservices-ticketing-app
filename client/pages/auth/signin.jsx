// components/SignupForm.js
import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"), // go to landing page
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await doRequest();
  };

  return (
    <div
      className="card shadow-sm"
      style={{ maxWidth: 500, margin: "40px auto" }}
    >
      <div className="card-header text-center fw-bold fs-4">
        Login
      </div>
      <div className="card-body">
        {errors}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
      <div className="card-footer text-muted text-center small">
        &copy; {new Date().getFullYear()}{" "}
        <a href="https://nysdev.com">nysdev.com</a>
      </div>
    </div>
  );
};

export default SignupForm;
