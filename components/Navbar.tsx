import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

const AppBar = async () => {
  const user = await getServerSession(options);
  return (
    <div className="bg-yellow-500 p-3 flex gap-5 ">
      <Link href={"/"} className="hover:text-white">
        Enroll Vehicle
      </Link>
      <Link href={"/enrollments"} className="hover:text-white">
        Enrollments
      </Link>
      <p>{user?.user.username}</p>

      <LoginButton />
    </div>
  );
};

export default AppBar;
