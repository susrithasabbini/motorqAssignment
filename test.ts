import { db } from "./lib/db";
import { Prisma } from "@prisma/client";

const createUser = async () => {
  await db.user.create({
    data: {
      username: "Susritha",
      password: "1234",
      role: "CUSTOMER",
    },
  });
};

createUser();
