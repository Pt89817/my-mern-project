import React, { useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/forgot-password", {
      email,
      newPassword: newPass,
    });

    alert(res.data.msg);
  };

  return (
    <div className="container mt-5 card w-50 shadow p-3">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="form-control mb-2" placeholder="New Password"
          onChange={(e) => setNewPass(e.target.value)} />

        <button className="btn btn-primary">Update Password</button>
        <button className="btn btn-dark ms-4"><Link to="/" className="text-decoration-none fw-bold text-success ms-2">BACK TO LOGIN PAGE</Link></button>
      </form>
    </div>
  );
}
