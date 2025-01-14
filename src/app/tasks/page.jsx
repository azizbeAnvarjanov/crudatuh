"use client";
// pages/tasks.js
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../firebase";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, "tasks");
      const taskSnapshot = await getDocs(tasksCollection);
      const taskList = taskSnapshot.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    };

    fetchTasks();
  }, []);

  const updateTaskStatus = async (id, newStatus) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, { status: newStatus });
    toast.success("Vazifa holati yangilandi");
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    toast.success("Vazifa o‘chirildi");
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <Toaster />
      <h1 className="text-xl font-bold mb-4">Vazifalar</h1>
      {tasks.map((task) => (
        <div key={task.id} className="p-4 mb-2 border border-gray-300 rounded">
          <h2 className="text-lg font-semibold">{task.name}</h2>
          <p>{task.description}</p>
          <p>Vazifa sanasi: {new Date(task.dueDate).toLocaleString()}</p>
          <p>Holati: {task.status}</p>
          <div className="space-x-2">
            <button
              onClick={() => updateTaskStatus(task.id, "jarayonda")}
              className="px-2 py-1 bg-yellow-500 text-white rounded"
            >
              Jarayonda
            </button>
            <button
              onClick={() => updateTaskStatus(task.id, "bajarilgan")}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              Bajarilgan
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              O‘chirish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
