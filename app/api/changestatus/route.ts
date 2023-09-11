import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";

export async function POST(req: Request) {
  const user = await getServerSession(options);
  console.log("Data");

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { status, id } = await req.json();
    console.log(id, status);

    const data = await db.enrollmentRequest.update({
      where: { id: id },
      data: { status: status },
    });

    if (data)
      return new Response("Successfully updated a document", { status: 200 });
    else return new Response("Failed to update a document", { status: 500 });
  } catch (error) {
    console.log(error);
  }
}
