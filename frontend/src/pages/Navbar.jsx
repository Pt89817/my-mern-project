import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let email = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.email;
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-check2-square me-2"></i>
          Todo App
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/todos">
                    <i className="bi bi-list-task me-1"></i>
                    My Todos
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light ms-2" 
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </button>
                          <span className="me-3">{email}</span>

                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="bi bi-person-plus me-1"></i>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;