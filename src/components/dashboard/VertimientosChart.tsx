// src/components/dashboard/VertimientosChart.tsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Tipo para los datos del gráfico
interface ChartData {
  name: string;
  [key: string]: string | number;
}

const VertimientosChart = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // En una implementación real, aquí llamaríamos a un servicio API
    // Pero para este ejemplo, usamos datos de ejemplo
    const fetchData = () => {
      setLoading(true);
      // Simulamos una carga
      setTimeout(() => {
        // Datos de ejemplo
        const mockData: ChartData[] = [
          {
            name: "Ene",
            "Aguas residuales domésticas": 14.5,
            "Pozo séptico": 8.2,
            "Trampa de grasas": 5.3,
            Sumidero: 3.1,
          },
          {
            name: "Feb",
            "Aguas residuales domésticas": 12.9,
            "Pozo séptico": 7.8,
            "Trampa de grasas": 6.5,
            Sumidero: 2.8,
          },
          {
            name: "Mar",
            "Aguas residuales domésticas": 15.2,
            "Pozo séptico": 9.1,
            "Trampa de grasas": 4.9,
            Sumidero: 3.5,
          },
          {
            name: "Abr",
            "Aguas residuales domésticas": 13.8,
            "Pozo séptico": 8.5,
            "Trampa de grasas": 5.7,
            Sumidero: 2.9,
          },
          {
            name: "May",
            "Aguas residuales domésticas": 16.1,
            "Pozo séptico": 9.8,
            "Trampa de grasas": 6.2,
            Sumidero: 3.4,
          },
          {
            name: "Jun",
            "Aguas residuales domésticas": 14.7,
            "Pozo séptico": 8.9,
            "Trampa de grasas": 5.8,
            Sumidero: 3.2,
          },
        ];
        setData(mockData);
        setLoading(false);
      }, 500);
    };

    fetchData();
  }, []);

  const colors: { [key: string]: string } = {
    "Aguas residuales domésticas": "#3b82f6",
    "Pozo séptico": "#10b981",
    "Trampa de grasas": "#f59e0b",
    Sumidero: "#8b5cf6",
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Volumen de Vertimientos por Tipo</CardTitle>
        <CardDescription>
          Metros cúbicos por tipo de vertimiento en los últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {loading ? (
          <div className="flex items-center justify-center h-[350px]">
            Cargando datos...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(colors).map((key) => (
                <Bar key={key} dataKey={key} fill={colors[key]} stackId="a" />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default VertimientosChart;
