// src/components/dashboard/EmpresasAprobadasChart.tsx
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Tipo para los datos del gráfico
interface ChartData {
  name: string;
  value: number;
}

const EmpresasAprobadasChart = () => {
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
          { name: "Ecosepticos", value: 32 },
          { name: "Septiclean", value: 27 },
          { name: "Otras empresas", value: 15 },
        ];
        setData(mockData);
        setLoading(false);
      }, 500);
    };

    fetchData();
  }, []);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Solicitudes por Empresa</CardTitle>
        <CardDescription>
          Distribución de solicitudes aprobadas por empresa
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[350px]">
            Cargando datos...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default EmpresasAprobadasChart;
