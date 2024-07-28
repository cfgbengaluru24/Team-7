import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFilter } from "@/context/FilterContext"; // Adjust the path as needed
import LocationFilter from "@/components/LocationFilter";

export function DashboardNavbar() {
  const { pathname } = useLocation();
  const { selectedFilters, setSelectedFilters } = useFilter();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  const handleFilterChange = (name, value) => {
    console.log(`Filter changed: ${name} = ${value}`);
    const newFilters = {
      ...selectedFilters,
      [name]: value,
    };
    setSelectedFilters(newFilters);
    if (name === 'location') {
      setShowLocationFilter(true);
    }
  };

  const resetFilters = () => {
    setSelectedFilters({});
    setShowLocationFilter(false);
    handleFilterChange("location", "");
    handleFilterChange("coordinator", "");
    handleFilterChange("severity", "");
    window.location.reload(); // Reload the page to reset everything
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const locations = ["1324", "Los Angeles", "Chicago"];

  return (
    <nav className="bg-blue-500 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h6 className="text-lg font-bold capitalize">Patient Data Analysis</h6>
        <div className="relative">
          <button
            className="filters-button bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600"
            onClick={toggleDropdown}
          >
            Filters
          </button>
          {isDropdownVisible && (
            <div className="filters-dropdown absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg p-4">
              <div className="filter-group mb-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={selectedFilters.location || ""}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="mt-2 bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-800"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      {/* {showLocationFilter && (
        <LocationFilter />
      )} */}
    </nav>
  );
}

export default DashboardNavbar;
