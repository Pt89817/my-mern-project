import React, { useState } from "react";
import API from "../../api";
import { Link, Navigate } from "react-router-dom";
export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
      Navigate("/dashboard")
    } else {
      alert(res.data.msg);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient">
      <div className="container">
        <div className="row justify-content-center align-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card  shadow-lg border-0 rounded-lg" style={{height:"650px"}}>
              {/* Card Header */}
              <div className="card-header bg-primary text-white text-center py-3">
                <h3 className="mb-0">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Welcome Back
                </h3>
              </div>

              {/* Card Body */}
              <div className="card-body p-2 p-md-5">
                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                  {/* Email Input */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold text-muted">
                      <i className="bi bi-envelope me-2"></i>
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person text-primary"></i>
                      </span>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg border-start-0"
                        placeholder="name@example.com"
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-text">Enter your registered email address</div>
                  </div>

                  {/* Password Input */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-bold text-muted">
                      <i className="bi bi-key me-2"></i>
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock text-primary"></i>
                      </span>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg border-start-0"
                        placeholder="••••••••"
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          const passwordField = document.getElementById('password');
                          passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
                        }}
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                    <div className="form-text">Must be at least 6 characters long</div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                      />
                      <label className="form-check-label text-muted" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="/forgot-password" className="text-decoration-none text-primary">
                      <i className="bi bi-question-circle me-1"></i>
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg shadow-sm"
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="text-center mb-4 position-relative">
                    <hr className="text-muted" />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                      Or
                    </span>
                  </div>

                  {/* Social Login (Optional) */}
                  <div className="row g-2 mb-4">
                    <div className="col-6">
                      <button type="button" className="btn btn-outline-dark btn-sm w-100">
                        <i className="bi bi-google me-2"></i>
                        Google
                      </button>
                    </div>
                    <div className="col-6">
                      <button type="button" className="btn btn-outline-primary btn-sm w-100">
                        <i className="bi bi-facebook me-2"></i>
                        Facebook
                      </button>
                    </div>
                  </div>

                  {/* Register Link */}
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?
                      <a
                        href="/register"
                        className="text-decoration-none fw-bold text-primary ms-2"
                      >
                        <i className="bi bi-person-plus me-1"></i>
                        Create Account
                      </a>
                    </p>
                  </div>
                </form>
              </div>              
            </div>           
          </div>
        </div>
      </div>
    </div>
  );
}
