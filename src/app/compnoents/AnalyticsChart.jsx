import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalyticsChart = ({ tasks }) => {
  const data = [
    {
      name: "Bajarilgan",
      value: tasks.filter((task) => task.status === "bajarilgan").length,
    },
    {
      name: "Bajarilmagan",
      value: tasks.filter((task) => task.status === "bajarilmagan").length,
    },
    {
      name: "Jarayonda",
      value: tasks.filter((task) => task.status === "jarayonda").length,
    },
    {
      name: "Nomalum",
      value: tasks.filter((task) => task.status === "nomalum").length,
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="analytics-chart">
      <h2>Vazifalar Analitikasi</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;
