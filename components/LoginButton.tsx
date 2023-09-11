"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();
  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <>
          <p className="text-sky-600"> {session.user.name}</p>
          <button
            className="bg-gray-200 hover:bg-red-700 p-2 rounded-md"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          className="text-green-600 hover:bg-green-700"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default LoginButton;
