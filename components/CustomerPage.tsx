import AddEnrollmentForm from "./AddEnrollmentForm";
import getVehicles from "@/app/actions/getVehicles";

export default async function CustomerPage() {
  const vehicles = await getVehicles();

  const handleSubmit = async (data: any) => {
    console.log(data);
  };

  return <AddEnrollmentForm vehicles={vehicles} />;
}
