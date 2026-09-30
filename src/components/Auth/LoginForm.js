import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { saveToken, saveUser } from "../../utils/auth";

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",

    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.username) {
      setError("Please enter Username or Email");

      return;
    }

    if (!form.password) {
      setError("Please enter password");

      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(form);

      if (!response.data.success) {
        setError(response.data.message);

        return;
      }

      const loggedUser = response.data.data.user;

      const token = response.data.data.token;

      login(loggedUser, token);

      if (loggedUser.must_change_password) {
        navigate("/change-password");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Unable to connect server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username / Email</label>

        <input
          className="form-control"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter Username or Email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>

        <input
          className="form-control"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
      </div>

      {error && <div className="error">{error}</div>}

      <button className="btn-primary" disabled={loading}>
        {loading ? "Signing In..." : "Login"}
      </button>

      <div className="text-center mt-20">
        Don't have an account?
        <br />
        <Link to="/register">Register Here</Link>
      </div>
    </form>
  );
}

export default LoginForm;
