import React, { useState } from "react";
import API from "../../api";
import { Link, Navigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/register", data);
    alert(res.data.msg);
  };
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-lg border-0 rounded-lg">
          {/* Card Header */}
          <div className="card-header bg-success text-white text-center py-3">
            <h3 className="mb-0">
              <i className="bi bi-person-plus me-2"></i>
              Register New Account
            </h3>
          </div>
          
          {/* Card Body */}
          <div className="card-body p-4 p-md-5">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              {/* Name Input */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold text-muted">
                  <i className="bi bi-person-badge me-2"></i>
                  Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-person text-success"></i>
                  </span>
                  <input 
                    type="text" 
                    id="name"
                    className="form-control form-control-lg border-start-0"
                    placeholder="John Doe"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold text-muted">
                  <i className="bi bi-envelope me-2"></i>
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-at text-success"></i>
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
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold text-muted">
                  <i className="bi bi-key me-2"></i>
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <i className="bi bi-lock text-success"></i>
                  </span>
                  <input 
                    type="password" 
                    id="password"
                    className="form-control form-control-lg border-start-0"
                    placeholder="••••••••"
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                    minLength="6"
                  />
                  <button 
                    type="submit" 
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

              

              {/* Terms and Conditions */}
              <div className="form-check mb-3">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="terms"
                  required
                />
                <label className="form-check-label text-muted" htmlFor="terms">
                  I agree to the 
                  <Link href="/terms" className="text-decoration-none text-success ms-1">
                    Terms & Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-decoration-none text-success">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <div className="d-grid mb-4">
                <button 
                  type="submit" 
                  className="btn btn-success btn-lg shadow-sm"
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Create Account
                </button>
              </div>

              {/* Divider */}
              <div className="text-center mb-4 position-relative">
                <hr className="text-muted" />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                  Or Sign Up With
                </span>
              </div>              
              {/* Login Link */}
              <div className="text-center">
                <p className="text-muted mb-0">
                  Already have an account?
                  <Link
                    to="/" 
                    className="text-decoration-none fw-bold text-success ms-2"
                  >Sign In
                    <i className="bi bi-box-arrow-in-right me-1"></i> 
                  </Link>
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
