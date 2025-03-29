// src/pages/Dashboard/DashboardPage.tsx
import React from "react";
import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EmpresasAprobadasChart from "@/components/dashboard/EmpresasAprobadasChart";
import RecentSolicitudes from "@/components/dashboard/RecentSolicitudes";
import VertimientosChart from "@/components/dashboard/VertimientosChart";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <DashboardHeader />
      <DashboardCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VertimientosChart />
        <EmpresasAprobadasChart />
      </div>

      <RecentSolicitudes />
    </div>
  );
};

export default DashboardPage;
