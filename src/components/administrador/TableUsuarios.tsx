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

interface User {
  id: number;
  nombre: string;
  cedula: string;
  correo: string;
  numeroContrato: string;
  duracionMeses: string;
  fechaInicio: string;
  fechaFinalizacion: string;
  rol: string;
  direccion: string;
  comuna: string;
}

interface TableUsuariosProps {
  users: User[]; // 🔹 Es un array de `User`
  loading: boolean; // 🔹 Es un booleano
}

export const TableUsuarios = ({ users, loading }: TableUsuariosProps) => {
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
                {Array.isArray(users) &&
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.nombre}
                      </TableCell>
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
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {users.length} usuarios
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
