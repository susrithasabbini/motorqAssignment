import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getServerSession(options);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { make, model, year, vinPrefix, vinSuffix, licensePlate } =
      await req.json();

    const parsedYear = parseInt(year);
    let vin = vinPrefix + vinSuffix;

    const vehicle = await db.vehicle.findUnique({
      where: {
        vinPrefix,
      },
    });

    const enrollment = await db.enrollmentRequest.create({
      // @ts-ignore
      data: {
        vin: vin,
        licensePlateNumber: licensePlate,
        vehicleId: vehicle?.id,
        userId: user.user.sub,
      },
    });

    if (enrollment)
      return new Response("Successfully created a document", { status: 200 });
    else return new Response("Failed to create a document", { status: 500 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  console.log(req);
}
