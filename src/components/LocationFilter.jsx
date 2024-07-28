import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { useFilter } from "@/context/FilterContext"; // Adjust the path as needed

const LocationFilter = () => {
  const { selectedFilters } = useFilter();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [oralHealthCount, setOralHealthCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/src/data/data.json');
        const filteredData = result.data.filter((item) => 
          (!selectedFilters.location || item.pincode.toString() === selectedFilters.location) &&
          (!selectedFilters.coordinator || item.name === selectedFilters.coordinator) &&
          (!selectedFilters.severity || item.Hemoglobinlevels.toString() === selectedFilters.severity) // Adjust this based on your data schema
        );
        setData(result.data);
        setFilteredData(filteredData);

        // Count the number of rows with oralHealthIndex < 20
        const count = filteredData.filter(item => item.oralHealthIndex < 20).length;
        setOralHealthCount(count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [selectedFilters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        {/* <strong>Number of patients with oralHealthIndex less than 20: </strong> {   } */}
      </div>
      <Table data={currentItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default LocationFilter;
