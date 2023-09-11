"use client";
import React, { useState } from "react";

const CustomerEnrollmentPage = ({ userEnrollments }: any) => {
  const [filters, setFilters] = useState({
    status: "",
    make: "",
    model: "",
    year: "",
  });

  const filteredEnrollments = userEnrollments.filter((item: any) => {
    return (
      (filters.status === "" || item.status === filters.status) &&
      (filters.year === "" || item.vehicle.year === parseInt(filters.year)) &&
      (filters.make === "" ||
        item.vehicle.make.toLowerCase().includes(filters.make.toLowerCase())) &&
      (filters.model === "" ||
        item.vehicle.model.toLowerCase().includes(filters.model.toLowerCase()))
    );
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-600 font-bold">
          Filter by Status:
        </label>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border rounded-md p-2 w-full"
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-bold">Filter by Make:</label>
        <input
          type="text"
          name="make"
          value={filters.make}
          onChange={handleFilterChange}
          className="border rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-bold">
          Filter by Model:
        </label>
        <input
          type="text"
          name="model"
          value={filters.model}
          onChange={handleFilterChange}
          className="border rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-bold">Filter by Year:</label>
        <input
          type="text"
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className="border rounded-md p-2 w-full"
        />
      </div>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-yellow-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-yellow-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              VIN
            </th>
            <th className="px-6 py-3 bg-yellow-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Make
            </th>
            <th className="px-6 py-3 bg-yellow-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Model
            </th>
            <th className="px-6 py-3 bg-yellow-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Year
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEnrollments.map((item: any) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-no-wrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.vin}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {item.vehicle.make}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {item.vehicle.model}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {item.vehicle.year}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerEnrollmentPage;
