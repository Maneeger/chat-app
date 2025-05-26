// src/layout/Layout.tsx
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
