// src/pages/Dashboard/DashboardPage.tsx
import React from "react";
import { DialogUsuarios } from "@/components/administrador/DialogUsuarios";
import { TableUsuarios } from "@/components/administrador/TableUsuarios";
import { useEffect, useState } from "react";
import Notiflix from "notiflix";
import { useApi } from "@/hooks/useApi";

interface User {
  id: number;
  nombre: string;
  cedula: string;
  correo: string;
  numeroContrato: string;
  duracion_meses: string;
  fecha_inicio: string;
  fecha_finalizacion: string;
  rol: Rol;
  direccion: string;
  comuna: string;
}

interface Rol {
  id:string;
  nombre:string;
  descripcion: string;
}

const DashboardUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Aseguramos que el estado inicial es un array vacío
  const [loading, setLoading] = useState<boolean>(true);
  const { get } = useApi(); // Extraemos el método get del hook

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await get<User[]>("/usuarios"); // Usamos el método get del hook
      if (Array.isArray(response)) {
        setUsers(response);
      } else {
        setUsers([]);
        Notiflix.Notify.warning(
          "La respuesta del servidor no contiene una lista de usuarios válida"
        );
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setUsers([]);
      // El manejo de errores ya está en el hook, pero podemos agregar un mensaje adicional si queremos
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-4">
      <DialogUsuarios fetchUsers={fetchUsers} />
      <TableUsuarios users={users} loading={loading} />
    </div>
  );
};

export default DashboardUsuarios;
