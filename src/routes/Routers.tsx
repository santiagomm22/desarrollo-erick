// src/router.tsx
import { Routes, Route } from "react-router-dom";
import SignInCard from "@/pages/login/SignInCard";
import DashboardUsuarios from "@/pages/CrearUsuarios/DashboardUsuarios";
import RegistroForm from "@/pages/registro/RegistroForm";
import DashboardArchivos from "@/pages/CargarArchivos/DashboardArchivos";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/components/layouts/MainLayout";

const Routers = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<SignInCard />} />
      <Route path="/registro" element={<RegistroForm />} />
      <Route element={<MainLayout />}>
        <Route path="/usuarios" element={<DashboardUsuarios />} />

        <Route path="/archivos" element={<DashboardArchivos />} />

        {/* Rutas protegidas con AuthLayout */}
        {/* <Route element={<MainLayout />}>
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
              <DashboardUsuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archivos"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
              <DashboardArchivos />
            </ProtectedRoute>
          }
        /> */}
        {/* Ejemplo: Ruta para Conductores */}
        {/* <Route
          path="/conductores"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRADOR", "COORDINADOR"]}>
              <ConductoresPage />
            </ProtectedRoute>
          }
        /> */}
      </Route>
    </Routes>
  );
};

export default Routers;
