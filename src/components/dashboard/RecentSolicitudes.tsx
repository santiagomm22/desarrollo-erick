// src/components/dashboard/RecentSolicitudes.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Tipo para las solicitudes
interface Solicitud {
  id: string;
  empresa: string;
  fechaVisita: Date;
  tipoVertimiento: string;
  volumen: number;
  estado: "CREADO" | "EN_REVISION" | "APROBADO" | "RECHAZADO" | "CANCELADO";
}

const RecentSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // En una implementación real, aquí llamaríamos a un servicio API
    // Pero para este ejemplo, usamos datos de ejemplo
    const fetchData = () => {
      try {
        setLoading(true);
        // Datos de ejemplo - simulamos una carga
        setTimeout(() => {
          const mockData: Solicitud[] = [
            {
              id: "SOL-001",
              empresa: "Ecosepticos",
              fechaVisita: new Date(2025, 2, 14), // 14 de marzo de 2025
              tipoVertimiento: "Aguas residuales domésticas",
              volumen: 7.4,
              estado: "EN_REVISION",
            },
            {
              id: "SOL-002",
              empresa: "Ecosepticos",
              fechaVisita: new Date(2025, 2, 6), // 6 de marzo de 2025
              tipoVertimiento: "Pozo séptico",
              volumen: 3.0,
              estado: "CREADO",
            },
            {
              id: "SOL-003",
              empresa: "Ecosepticos",
              fechaVisita: new Date(2025, 2, 5), // 5 de marzo de 2025
              tipoVertimiento: "Aguas residuales domésticas",
              volumen: 7.2,
              estado: "EN_REVISION",
            },
            {
              id: "SOL-004",
              empresa: "Ecosepticos",
              fechaVisita: new Date(2025, 2, 6), // 6 de marzo de 2025
              tipoVertimiento: "Aguas residuales domésticas",
              volumen: 10.1,
              estado: "CREADO",
            },
          ];
          setSolicitudes(mockData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Error al cargar las solicitudes");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Solicitudes Recientes</CardTitle>
        <CardDescription>
          Últimas solicitudes de vertimiento registradas en el sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Cargando solicitudes...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Fecha Visita</TableHead>
                  <TableHead>Tipo Vertimiento</TableHead>
                  <TableHead>Volumen (m³)</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solicitudes.map((solicitud) => (
                  <TableRow key={solicitud.id}>
                    <TableCell className="font-medium">
                      {solicitud.id}
                    </TableCell>
                    <TableCell>{solicitud.empresa}</TableCell>
                    <TableCell>
                      {format(solicitud.fechaVisita, "dd/MM/yyyy", {
                        locale: es,
                      })}
                    </TableCell>
                    <TableCell>{solicitud.tipoVertimiento}</TableCell>
                    <TableCell>{solicitud.volumen.toFixed(1)}</TableCell>
                    <TableCell>
                      <EstadoBadge estado={solicitud.estado} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild size="sm" variant="ghost">
                        <Link to={`/solicitudes/${solicitud.id}`}>Ver</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button asChild variant="outline">
                <Link to="/solicitudes">Ver todas las solicitudes</Link>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Componente para mostrar el estado con el color adecuado
const EstadoBadge = ({ estado }: { estado: string }) => {
  const getVariant = () => {
    switch (estado) {
      case "CREADO":
        return "outline";
      case "EN_REVISION":
        return "secondary";
      case "APROBADO":
        return "success";
      case "RECHAZADO":
        return "destructive";
      case "CANCELADO":
        return "muted";
      default:
        return "outline";
    }
  };

  const getLabel = () => {
    switch (estado) {
      case "CREADO":
        return "Creado";
      case "EN_REVISION":
        return "En Revisión";
      case "APROBADO":
        return "Aprobado";
      case "RECHAZADO":
        return "Rechazado";
      case "CANCELADO":
        return "Cancelado";
      default:
        return estado;
    }
  };

  return <Badge variant={getVariant() as any}>{getLabel()}</Badge>;
};

export default RecentSolicitudes;
