"use client";
// pages/dashboard.js
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const [taskStats, setTaskStats] = useState({
    total: 0,
    nomalum: 0,
    bajarilmagan: 0,
    jarayonda: 0,
    bajarilgan: 0,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCollection = collection(db, "tasks");
      const taskSnapshot = await getDocs(tasksCollection);
      const taskList = taskSnapshot.docs?.map((doc) => doc.data());

      const stats = {
        total: taskList.length,
        nomalum: taskList.filter((task) => task.status === "nomalum").length,
        bajarilmagan: taskList.filter((task) => task.status === "bajarilmagan")
          .length,
        jarayonda: taskList.filter((task) => task.status === "jarayonda")
          .length,
        bajarilgan: taskList.filter((task) => task.status === "bajarilgan")
          .length,
      };

      setTaskStats(stats);
    };

    fetchTasks();
  }, []);

  const data = {
    labels: ["Nomalum", "Bajarilmagan", "Jarayonda", "Bajarilgan"],
    datasets: [
      {
        data: [
          taskStats.nomalum,
          taskStats.bajarilmagan,
          taskStats.jarayonda,
          taskStats.bajarilgan,
        ],
        backgroundColor: [
          "rgba(175, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 200, 64, 1)",
          "rgba(75, 192, 12, 1)",
        ],
        borderColor: [
          "rgba(175, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 12, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Analitika</h1>
      <div className="w-1/2 mx-auto">
        <Pie data={data} />
      </div>
      <div className="mt-4">
        <p>Jami vazifalar: {taskStats.total}</p>
        <p>Nomalum: {taskStats.nomalum}</p>
        <p>Bajarilmagan: {taskStats.bajarilmagan}</p>
        <p>Jarayonda: {taskStats.jarayonda}</p>
        <p>Bajarilgan: {taskStats.bajarilgan}</p>
      </div>
    </div>
  );
};

export default Dashboard;
