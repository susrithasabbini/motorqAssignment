import { withAuth, NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) =>
        token?.role === "ADMIN" || token?.role === "CUSTOMER",
    },
  }
);

// export { default } from "next-auth/middleware";
