import { chartsConfig } from "@/configs";

const anemiaChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Patients",
      data: [50, 20, 10, 22],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["5", "10", "15", "20"],
    },
  },
};

const oralHealthChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Patients",
      data: [50, 20, 10, 22],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["5", "10", "15", "20"],
    },
  },
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Anemia",
    description: "Anemia Monitoring",
    footer: "updated 2 days ago",
    chart: anemiaChart,
  },
  {
    color: "white",
    title: "Oral Index Count",
    description: "Oral Health Monitoring",
    footer: "updated 4 min ago",
    chart: oralHealthChart,
  },
];

export default statisticsChartsData;