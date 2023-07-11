/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const reportsLineChartData = {
  sales: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: {
      label: "Output",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
    profit: 12,
    updatedAt: "updated 4 days ago",
  },
  tasks: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: {
      label: "Tasks",
      data: [2, 3, 2, 5, 1, 4, 2],
    },
  },
};

export default reportsLineChartData;
