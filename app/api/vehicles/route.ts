import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const user = await getServerSession(options);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    let { make, model, year, vinPrefix } = await req.json();
    year = parseInt(year);

    const vinPrefixExists = await db.vehicle.findUnique({
      where: {
        vinPrefix,
      },
    });

    if (vinPrefixExists) {
      return new Response("VIN Prefix already exists", { status: 400 });
    }

    const vehicle = await db.vehicle.create({
      data: {
        make,
        model,
        year,
        vinPrefix,
      },
    });

    if (vehicle)
      return new Response("Successfully created a document", { status: 200 });
    else return new Response("Failed to create a document", { status: 500 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
