import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function getUserEnrollments() {
  const user = await getServerSession(options);
  try {
    const enrollments = await db.enrollmentRequest.findMany({
      where: {
        user: user?.user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: true,
        vehicle: true,
      },
    });
    return enrollments;
  } catch (error) {
    console.log(error);
  }
}
