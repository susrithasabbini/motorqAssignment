import { db } from "@/lib/db";

export default async function getEnrollments() {
  try {
    const enrollments = await db.enrollmentRequest.findMany({
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
