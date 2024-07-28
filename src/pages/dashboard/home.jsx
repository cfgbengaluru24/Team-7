import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import LocationFilter from '@/components/LocationFilter';
import { useFilter } from "@/context/FilterContext";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { StatisticsChart } from '@/widgets/charts';
import { StatisticsCard } from '@/widgets/cards';
import { statisticsCardsData } from "@/data";
import { chartsConfig } from "@/configs";

const Home = ({ reset }) => {
  const { selectedFilters } = useFilter();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [oralHealthCount, setOralHealthCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [oralHealthChartData, setOralHealthChartData] = useState([0, 0, 0, 0]);
  const [hemoglobinChartData, setHemoglobinChartData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/src/data/data.json');
        setData(result.data);
        setTotalCount(result.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const filtered = data.filter((item) => 
        (!selectedFilters.location || item.pincode.toString() === selectedFilters.location) &&
        (!selectedFilters.coordinator || item.name === selectedFilters.coordinator) &&
        (!selectedFilters.severity || item.Hemoglobinlevels.toString() === selectedFilters.severity)
      );

      setFilteredData(filtered);

      // Count the number of rows with oralHealthIndex < 20
      const oralCount = filtered.filter(item => item.oralHealthIndex < 20).length;
      setOralHealthCount(oralCount);

      // Calculate the counts for the oral health index chart
      const oralHealthCounts = [0, 0, 0, 0];
      const hemoglobinCounts = [0, 0, 0, 0];
      filtered.forEach(item => {
        if (item.oralHealthIndex < 5) oralHealthCounts[0]++;
        else if (item.oralHealthIndex < 10) oralHealthCounts[1]++;
        else if (item.oralHealthIndex < 15) oralHealthCounts[2]++;
        else if (item.oralHealthIndex < 20) oralHealthCounts[3]++;

        if (item.Hemoglobinlevels < 5) hemoglobinCounts[0]++;
        else if (item.Hemoglobinlevels < 10) hemoglobinCounts[1]++;
        else if (item.Hemoglobinlevels < 15) hemoglobinCounts[2]++;
        else hemoglobinCounts[3]++; // Ensure values >= 20 are accounted for
      });
      setOralHealthChartData(oralHealthCounts);
      setHemoglobinChartData(hemoglobinCounts);
    };

    filterData();
  }, [selectedFilters, data]);

  useEffect(() => {
    if (reset) {
      setFilteredData([]);
      setCurrentPage(1);
      setOralHealthCount(0);
      setOralHealthChartData([0, 0, 0, 0]);
      setHemoglobinChartData([0, 0, 0, 0]);
    }
  }, [reset]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const oralHealthChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Patients",
        data: oralHealthChartData,
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
        categories: ["<5", "5-10", "10-15", "15-20"],
      },
    },
  };

  const hemoglobinChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Patients",
        data: hemoglobinChartData,
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#e53935",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["<5", "5-10", "10-15", "15-20"],
      },
    },
  };

  const statisticsChartsData = [
    {
      color: "white",
      title: "Oral Index Count",
      description: "Oral Health Monitoring",
      footer: "updated 4 min ago",
      chart: oralHealthChart,
    },
    {
      color: "white",
      title: "Hemoglobin Levels",
      description: "Hemoglobin Monitoring",
      footer: "updated 4 min ago",
      chart: hemoglobinChart,
    },
  ];

  return (
    <div className="p-4 mt-12">
      <LocationFilter />

      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
  <div className="mb-2">
    <strong className="text-lg font-bold text-gray-800">
      Total number of rows fetched:
    </strong> 
    <span className="text-lg font-semibold text-blue-600">{totalCount}</span>
  </div>
  <div className="mb-2">
    <strong className="text-lg font-bold text-gray-800">
      Number of patients with oralHealthIndex less than 20:
    </strong> 
    <span className="text-lg font-semibold text-blue-600">{oralHealthCount}</span>
  </div>
</div>


      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div> */}

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

      {/* Uncomment and use these components as needed */}
      {/* <Table data={currentItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default Home;
