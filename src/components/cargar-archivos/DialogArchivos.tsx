import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import Notiflix from "notiflix";
import { useApi } from "@/hooks/useApi";

export const DialogArchivos = () => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { post } = useApi(); // Desestructuramos el método post del hook

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      Notiflix.Notify.warning("Por favor selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("archivo", file);

    try {
      await post("/api/archivos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); // Usamos post del hook
      Notiflix.Notify.success("Archivo subido exitosamente");
      setNombre("");
      setFile(null);
      setOpen(false);
    } catch (error) {
      // El hook ya maneja el error y muestra la notificación con Notiflix
      console.error("Error al subir el archivo:", error); // Opcional: log para depuración
    }
  };

  return (
    <Card>
      <CardContent className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cargar Archivos</h1>
          <p className="text-muted-foreground flex items-center mt-1">
            <CalendarDays className="mr-1 h-4 w-4" />
            {formattedDate}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Subir archivo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Subir Nuevo Archivo</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>

                  <Input
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    placeholder="Ingrese el nombre del archivo o documento"
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="archivo">Archivo</Label>
                  <Input
                    id="archivo"
                    type="file"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Subir Archivo
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
