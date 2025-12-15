import React, { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const navigate = useNavigate();

  // 🔐 Protect dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await API.get("/todo/all");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    try {
      if (!task.trim()) return;

      await API.post("/todo/add", { task });
      setTask("");
      loadTasks();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete("/todo/delete/" + id);
      loadTasks();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const startEdit = (t) => {
    setEditId(t._id);
    setEditText(t.task);
  };

  const handleUpdate = async () => {
    try {
      await API.put("/todo/update/" + editId, { task: editText });
      setEditId(null);
      setEditText("");
      loadTasks();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAuthError = (err) => {
    console.error(err);
    if (err.response?.status === 401) {
      alert("Session expired. Please login again.");
      logout();
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <>
      {/* HEADER */}
      <nav className="navbar bg-dark px-3">
        <span className="navbar-brand text-white">My Dashboard</span>
        <button className="btn btn-outline-light" onClick={logout}>
          Logout
        </button>
      </nav>

      {/* TODO APP */}
      <div className="container col-lg-8 mt-5">
        <h2 className="fw-bold mb-3">My TODO List</h2>

        <div className="d-flex">
          <input
            className="form-control"
            placeholder="New Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-success ms-2" onClick={addTask}>
            Add
          </button>
        </div>

        <ul className="list-group mt-3">
          {tasks.map((t) => (
            <li
              key={t._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editId === t._id ? (
                <input
                  className="form-control"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span>{t.task}</span>
              )}

              <div className="d-flex  ms-2">
                {editId === t._id ? (
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => startEdit(t)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(t._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
