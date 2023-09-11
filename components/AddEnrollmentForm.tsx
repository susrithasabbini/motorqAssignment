"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const AddEnrollmentForm = ({ vehicles, toCustomerPage }: any) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedMake, setSelectedMake] = useState("");
  const [filteredModels, setFilteredModels] = useState<string[]>([]);
  const [vinPrefix, setVinPrefix] = useState<string>();

  const handleMakeChange = (selectedMake: string) => {
    setSelectedMake(selectedMake);
    const modelsForSelectedMake = vehicles
      .filter((vehicle: any) => vehicle.make === selectedMake)
      .map((vehicle: any) => vehicle.model);
    setFilteredModels(modelsForSelectedMake);
  };

  const handleModelChange = (selectedModel: string) => {
    const vinPrefixForSelectedModel = vehicles
      .filter((vehicle: any) => vehicle.model === selectedModel)
      .map((vehicle: any) => vehicle.vinPrefix);
    setVinPrefix(vinPrefixForSelectedModel[0]);
  };

  const onSubmit = async (formData: any) => {
    try {
      await axios.post("/api/enrollments", formData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Enroll Vehicle
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="make" className="block text-gray-600 font-bold">
              Make:
            </label>
            <select
              id="make"
              {...register("make")}
              required
              value={selectedMake}
              className="border rounded-md p-2 w-full"
              onChange={(e) => handleMakeChange(e.target.value)}
            >
              <option value="" disabled selected>
                Select Make
              </option>
              {vehicles?.map((vehicle: any) => (
                <option key={vehicle.id} value={vehicle.make}>
                  {vehicle.make}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="model" className="block text-gray-600 font-bold">
              Model:
            </label>
            <select
              id="model"
              {...register("model")}
              required
              onChange={(e) => handleModelChange(e.target.value)}
              className="border rounded-md p-2 w-full"
            >
              <option value="" disabled selected>
                Select Model
              </option>
              {filteredModels.map((model: string) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-gray-600 font-bold">
              Year:
            </label>
            <input
              type="number"
              id="year"
              {...register("year")}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="vinPrefix"
              className="block text-gray-600 font-bold"
            >
              VIN (First 8 Characters):
            </label>
            <select
              id="vinPrefix"
              {...register("vinPrefix")}
              required
              className="border rounded-md p-2 w-full"
            >
              <option value="" disabled selected>
                Select VIN Prefix
              </option>

              <option key={vinPrefix} value={vinPrefix}>
                {vinPrefix}
              </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="vinSuffix"
              className="block text-gray-600 font-bold"
            >
              VIN (Next 9 Characters):
            </label>
            <input
              type="text"
              id="vinSuffix"
              {...register("vinSuffix")}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="licensePlate"
              className="block text-gray-600 font-bold"
            >
              License Plate:
            </label>
            <input
              type="text"
              id="licensePlate"
              {...register("licensePlate")}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-800 w-full"
          >
            Enroll Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEnrollmentForm;
