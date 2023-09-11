import { db } from "@/lib/db";

export default async function getVehicles() {
  try {
    const vehicles = await db.vehicle.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return vehicles;
  } catch (error) {
    console.log(error);
  }
}
