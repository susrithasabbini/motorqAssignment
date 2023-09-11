import { useForm } from "react-hook-form";
import axios from "axios";

const AddVehicleForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      await axios.post("/api/vehicles", formData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Vehicle</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="make" className="block text-gray-600 font-bold">
              Make:
            </label>
            <input
              type="text"
              id="make"
              {...register("make")}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-gray-600 font-bold">
              Model:
            </label>
            <input
              type="text"
              id="model"
              {...register("model")}
              required
              className="border rounded-md p-2 w-full"
            />
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
            <input
              type="text"
              id="vinPrefix"
              {...register("vinPrefix")}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-800 w-full"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleForm;
