import React, { createContext, useState, useContext } from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    coordinator: "",
    severity: "",
  });

  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
