// src/pages/Dashboard/DashboardPage.tsx
import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const DashboardUsuarios: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <DashboardHeader />
    </div>
  );
};

export default DashboardUsuarios;
