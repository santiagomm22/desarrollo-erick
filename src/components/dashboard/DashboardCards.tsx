// src/components/dashboard/DashboardCards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileCheck, Users, Truck, FileX } from "lucide-react";

const DashboardCards = () => {
  // En producción, estos datos vendrían de la API
  const stats = {
    solicitudesAprobadas: 45,
    solicitudesPendientes: 12,
    empresasActivas: 8,
    vehiculosRegistrados: 24,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Solicitudes Aprobadas
          </CardTitle>
          <FileCheck className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.solicitudesAprobadas}</div>
          <p className="text-xs text-muted-foreground">
            +5% respecto al mes anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Solicitudes Pendientes
          </CardTitle>
          <FileX className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.solicitudesPendientes}
          </div>
          <p className="text-xs text-muted-foreground">
            -2% respecto al mes anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Empresas Activas
          </CardTitle>
          <Users className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.empresasActivas}</div>
          <p className="text-xs text-muted-foreground">+1 nueva este mes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Vehículos Registrados
          </CardTitle>
          <Truck className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.vehiculosRegistrados}</div>
          <p className="text-xs text-muted-foreground">+3 nuevos este mes</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
