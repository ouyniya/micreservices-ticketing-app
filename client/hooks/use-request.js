// hooks/use-request.js
import axios from "axios";
import { useState } from "react";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null); // clear previous errors
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      const message =
        err.response?.data || "Something went wrong. Please try again.";

      setErrors(
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {Array.isArray(message) ? (
            <ul className="mb-0">
              {message.map((err, index) => (
                <li key={index}>{err.message || err}</li>
              ))}
            </ul>
          ) : (
            <span>{message}</span>
          )}
          <button
            type="button"
            className="btn-close"
            onClick={() => setErrors(null)}
          ></button>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
