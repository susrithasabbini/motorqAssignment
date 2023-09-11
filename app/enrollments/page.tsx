import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import AdminEnrollmentsPage from "@/components/AdminEnrollmentsPage";
import CustomerEnrollmentPage from "@/components/CustomerEnrollmentPage";
import getEnrollments from "../actions/getEnrollments";
import getUserEnrollments from "../actions/getUserEnrollments";

const EnrollmentsPage = async () => {
  const user = await getServerSession(options);
  const enrollments = await getEnrollments();
  const userEnrollments = await getUserEnrollments();
  const isAdmin = user?.user.role === "ADMIN";
  const isUser = user?.user.role === "CUSTOMER";
  return (
    <div>
      {isAdmin && <AdminEnrollmentsPage enrollments={enrollments} />}
      {isUser && <CustomerEnrollmentPage userEnrollments={userEnrollments} />}
    </div>
  );
};

export default EnrollmentsPage;
