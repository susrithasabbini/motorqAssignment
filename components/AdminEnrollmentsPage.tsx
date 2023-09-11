"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = ({ enrollments }: any) => {
  const [filteredEnrollments, setFilteredEnrollments] = useState(enrollments);
  const [searchVIN, setSearchVIN] = useState("");
  const [searchMake, setSearchMake] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleStateChange = async (id: string, status: string) => {
    const payload = {
      status: status,
      id: id,
    };

    try {
      await axios.post(`/api/changestatus/`, payload);
      // Assuming you update the status locally, you can update it here as well
      const updatedEnrollments = enrollments.map((enrollment: any) =>
        enrollment.id === id ? { ...enrollment, status: status } : enrollment
      );
      setFilteredEnrollments(updatedEnrollments);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter data when any filter criteria changes
  useEffect(() => {
    let filteredData = enrollments;

    // Filter by VIN
    if (searchVIN !== "") {
      filteredData = filteredData.filter((item: any) =>
        item.vin.includes(searchVIN)
      );
    }

    // Filter by Model
    if (searchModel !== "") {
      filteredData = filteredData.filter((item: any) =>
        item.vehicle.model.includes(searchModel)
      );
    }

    // Filter by Make
    if (searchMake !== "") {
      filteredData = filteredData.filter((item: any) =>
        item.vehicle.make.includes(searchMake)
      );
    }

    // Filter by Status
    if (selectedStatus !== "All") {
      filteredData = filteredData.filter(
        (item: any) => item.status === selectedStatus
      );
    }

    setFilteredEnrollments(filteredData);
  }, [searchVIN, searchModel, searchMake, selectedStatus, enrollments]);

  return (
    <div className="container mx-auto p-4">
      {/* Filter dropdowns */}
      <div className="mb-4">
        <label htmlFor="vinFilter" className="block text-gray-600 font-bold">
          Filter by VIN:
        </label>
        <input
          type="text"
          id="vinFilter"
          value={searchVIN}
          onChange={(e) => setSearchVIN(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="modelFilter" className="block text-gray-600 font-bold">
          Filter by Model:
        </label>
        <input
          type="text"
          id="modelFilter"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="makeFilter" className="block text-gray-600 font-bold">
          Filter by Make:
        </label>
        <input
          type="text"
          id="makeFilter"
          value={searchMake}
          onChange={(e) => setSearchMake(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="statusFilter" className="block text-gray-600 font-bold">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option value="All">All</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-yellow-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEnrollments.map((item: any) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {item.user.username}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.status}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.vin}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {item.vehicle.make}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {item.vehicle.model}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {item.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => {
                        handleStateChange(item.id, "ACCEPTED");
                      }}
                      className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        handleStateChange(item.id, "REJECTED");
                      }}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
