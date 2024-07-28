// src/components/Table.jsx

import React from 'react';

const Table = ({ data }) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="border border-gray-300 p-2">ID</th>
          <th className="border border-gray-300 p-2">Pincode</th>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Age</th>
          <th className="border border-gray-300 p-2">Hemoglobin Levels</th>
          <th className="border border-gray-300 p-2">Oral Health Index</th>
          <th className="border border-gray-300 p-2">Email</th>

        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border border-gray-300 p-2">{item.id}</td>
            <td className="border border-gray-300 p-2">{item.pincode}</td>
            <td className="border border-gray-300 p-2">{item.name}</td>
            <td className="border border-gray-300 p-2">{item.age}</td>
            <td className="border border-gray-300 p-2">{item.Hemoglobinlevels}</td>
            <td className="border border-gray-300 p-2">{item.oralHealthIndex}</td>
            <td className="border border-gray-300 p-2">{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
