import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import AdminPage from "@/components/AdminPage";
import CustomerPage from "@/components/CustomerPage";

const HomePage = async () => {
  const user = await getServerSession(options);
  const isAdmin = user?.user.role === "ADMIN";
  const isUser = user?.user.role === "CUSTOMER";

  return (
    <div>
      {isAdmin && <AdminPage />}
      {isUser && <CustomerPage />}
    </div>
  );
};

export default HomePage;
