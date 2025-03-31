import React from "react";
import { DialogArchivos } from "@/components/cargar-archivos/DialogArchivos";

const DashboardArchivos: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <DialogArchivos />
    </div>
  );
};

export default DashboardArchivos;
