import { useState, useEffect } from "react";
import "./App.css";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

function App() {
  const [task, setTask] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const taskData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(taskData);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      tasks.forEach((taskItem) => {
        if (!taskItem.dateTime) return;

        const taskTime = new Date(taskItem.dateTime);
        const diff = Math.abs(taskTime.getTime() - now.getTime());

        if (diff < 60000 && Notification.permission === "granted") {
          new Notification("⏰ Reminder", {
            body: taskItem.title,
          });
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [tasks]);

  const resetForm = () => {
    setTask("");
    setDateTime("");
    setEditingId(null);
  };

  const saveTask = async () => {
    if (!task || !dateTime) return;

    if (editingId) {
      const taskRef = doc(db, "tasks", editingId);
      await updateDoc(taskRef, {
        title: task,
        dateTime,
      });
      resetForm();
      return;
    }

    await addDoc(collection(db, "tasks"), {
      title: task,
      dateTime,
      createdAt: new Date().toISOString(),
    });

    resetForm();
  };

  const editTask = (taskItem) => {
    setEditingId(taskItem.id);
    setTask(taskItem.title || "");
    setDateTime(taskItem.dateTime || "");
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    if (editingId === taskId) {
      resetForm();
    }
  };

  return (
    <main className="app-shell">
      <section className="task-panel">
        <h1>Smart Reminder App</h1>

        <div className="task-form">
          <label className="field-group">
            <span>Reminder</span>
            <input
              className="task-input"
              type="text"
              placeholder="Enter your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </label>

          <label className="field-group">
            <span>Date / Time</span>
            <input
              className="task-input"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </label>

          <div className="form-actions">
            <button className="btn btn-primary" onClick={saveTask}>
              {editingId ? "Save Reminder" : "Add Reminder"}
            </button>
            {editingId && (
              <button
                className="btn btn-secondary"
                onClick={resetForm}
                type="button"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="task-list">
        <h2>{tasks.length ? "Upcoming Reminders" : "No reminders yet"}</h2>

        {tasks.map((taskItem) => (
          <article key={taskItem.id} className="task-item">
            <div>
              <p className="task-title">{taskItem.title}</p>
              <p className="task-time">
                {new Date(taskItem.dateTime).toLocaleString()}
              </p>
            </div>

            <div className="task-actions">
              <button
                className="btn btn-edit"
                onClick={() => editTask(taskItem)}
                type="button"
              >
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => deleteTask(taskItem.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;