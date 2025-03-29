// src/components/dashboard/DashboardHeader.tsx
import { CalendarDays } from "lucide-react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const DashboardHeader = () => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  return (
    <Card>
      <CardContent className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Creacion de Usuarios
          </h1>
          <p className="text-muted-foreground flex items-center mt-1">
            <CalendarDays className="mr-1 h-4 w-4" />
            {formattedDate}
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Crear Usuario</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHeader;
