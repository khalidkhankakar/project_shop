"use client";

import { SessionProvider } from "next-auth/react";


export const Provider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};