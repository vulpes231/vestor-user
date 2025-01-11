/* eslint-disable no-unused-vars */
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { styles } from "../constants/styles";

// Register necessary Chart.js components (v3+)
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data for the line chart (replace with your actual net growth data)
const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ], // Months as labels on the Y-axis
  datasets: [
    {
      label: "Net Growth", // Label for the line
      data: [
        10000, 15000, 25000, 30000, 40000, 45000, 60000, 70000, 75000, 80000,
        90000, 100000,
      ], // Amounts in 10k increments
      fill: false, // Don't fill the area under the line
      borderColor: "#4B8BF9", // Line color (bright blue for dark background)
      tension: 0.1, // Line smoothness
      pointBackgroundColor: "#ffffff", // Point color (white for visibility)
      pointBorderColor: "#4B8BF9", // Point border color (blue)
      pointBorderWidth: 2, // Point border width
      pointRadius: 5, // Point size
    },
  ],
};

// Chart options with customizations for dark background
const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: "Net Growth Over Time",
      font: {
        size: 18,
        weight: "bold",
      },
      color: "#fff", // Title color (white for dark background)
    },
    tooltip: {
      backgroundColor: "#333", // Tooltip background color
      titleColor: "#fff", // Tooltip title color
      bodyColor: "#fff", // Tooltip body color
      borderColor: "#4B8BF9", // Tooltip border color
      borderWidth: 1, // Tooltip border width
      callbacks: {
        label: (tooltipItem) => {
          return `Amount: $${tooltipItem.raw.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true, // Start the Y-axis from 0
      ticks: {
        stepSize: 10000, // 10k increments on the Y-axis
        callback: function (value) {
          return `$${value.toLocaleString()}`; // Format as currency
        },
        color: "#ddd", // Y-axis tick color (light gray for dark background)
      },
      grid: {
        color: "#444", // Grid lines color (dark gray for dark background)
      },
    },
    x: {
      title: {
        display: true,
        text: "Months", // Label for the X-axis
        color: "#ddd", // X-axis label color (light gray)
      },
      ticks: {
        color: "#ddd", // X-axis ticks color (light gray)
      },
      grid: {
        color: "#444", // Grid lines color (dark gray for dark background)
      },
    },
  },
};

const Netgrowth = () => {
  return (
    <div className="md:col-span-2 bg-stone-900 bg-opacity-40 hidden md:flex">
      <h3 className={`p-6 ${styles.dashTitle}`}>Net Growth</h3>
      <div className="p-6">
        {/* Line Chart */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Netgrowth;
