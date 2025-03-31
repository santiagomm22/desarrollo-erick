import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

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

interface TableUsuariosProps {
  users: User[]; // 🔹 Es un array de `User`
  loading: boolean; // 🔹 Es un booleano
}

export const TableUsuarios = ({ users, loading }: TableUsuariosProps) => {
  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calcular índices para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los usuarios de la página actual
  const currentUsers = Array.isArray(users)
    ? users.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Calcular el número total de páginas
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Función para ir a la primera página
  const goToFirstPage = () => setCurrentPage(1);

  // Función para ir a la última página
  const goToLastPage = () => setCurrentPage(totalPages);

  // Opciones para el número de elementos por página
  const itemsPerPageOptions = [5, 10, 25, 50];

  // Función para cambiar el número de elementos por página
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Resetear a la primera página al cambiar los items por página
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Usuarios Registrados</CardTitle>
        <CardDescription>
          Lista de usuarios registrados en el sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            Cargando usuarios...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No hay usuarios registrados.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Nombre</TableHead>
                  <TableHead className="font-medium">Cédula</TableHead>
                  <TableHead className="font-medium">Correo</TableHead>
                  <TableHead className="font-medium">Rol</TableHead>
                  <TableHead className="font-medium">Contrato</TableHead>
                  <TableHead className="font-medium">Duración</TableHead>
                  <TableHead className="font-medium">Inicio</TableHead>
                  <TableHead className="font-medium">Fin</TableHead>
                  <TableHead className="font-medium">Dirección</TableHead>
                  <TableHead className="font-medium">Comuna</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
<<<<<<< HEAD
                {Array.isArray(users) &&
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.nombre}
                      </TableCell>
                      <TableCell>{user.cedula}</TableCell>
                      <TableCell>{user.correo}</TableCell>
                      <TableCell>{user.rol.nombre}</TableCell>
                      <TableCell>{user.numeroContrato}</TableCell>
                      <TableCell>{user.duracion_meses} meses</TableCell>
                      <TableCell>{user.fecha_inicio}</TableCell>
                      <TableCell>{user.fecha_finalizacion}</TableCell>
                      <TableCell>{user.direccion}</TableCell>
                      <TableCell>{user.comuna}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
=======
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.nombre}</TableCell>
                    <TableCell>{user.cedula}</TableCell>
                    <TableCell>{user.correo}</TableCell>
                    <TableCell>{user.rol}</TableCell>
                    <TableCell>{user.numeroContrato}</TableCell>
                    <TableCell>{user.duracionMeses} meses</TableCell>
                    <TableCell>{user.fechaInicio}</TableCell>
                    <TableCell>{user.fechaFinalizacion}</TableCell>
                    <TableCell>{user.direccion}</TableCell>
                    <TableCell>{user.comuna}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost">
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
>>>>>>> b32469c2678bce0d3a6cee6d0fb4a686093d4a7f
              </TableBody>
            </Table>

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Mostrar
                </span>
                <select
                  className="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm"
                  value={itemsPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  por página
                </span>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, users.length)} de {users.length}{" "}
                usuarios
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      // Si hay 5 o menos páginas, mostrar todas
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      // Si estamos en las primeras páginas
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // Si estamos en las últimas páginas
                      pageNum = totalPages - 4 + i;
                    } else {
                      // Si estamos en páginas intermedias
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="icon"
                        onClick={() => paginate(pageNum)}
                        className="h-8 w-8"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
