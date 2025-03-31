// src/components/dashboard/DashboardHeader.tsx
import { CalendarDays, Eye, EyeOff } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { ScrollArea } from "../ui/ScrollArea";
import { FormEvent, useState } from "react";
import Notiflix from "notiflix";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Calendar } from "../ui/Calendar";
import { cn } from "@/lib/utils";
import { useApi } from "@/hooks/useApi"; // Hook ya importado

interface DialogUsuariosProps {
  fetchUsers: () => void; // 🔹 Especificamos que es una función
}

export const DialogUsuarios = ({ fetchUsers }: DialogUsuariosProps) => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", {
    locale: es,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { post } = useApi(); // Desestructuramos el método post del hook

  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    numeroContrato: "",
    duracionMeses: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    rol: "",
    direccion: "",
    comuna: "",
    password: "",
    confirmPassword: "",
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Estado para errores

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rol: value }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setFormData((prev) => ({ ...prev, [name]: formattedDate }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      Notiflix.Notify.warning("Por favor corrige los errores en el formulario");
      return;
    }

    // Filtramos confirmPassword ya que no es necesario enviarlo al backend
    const { confirmPassword, ...dataToSend } = formData;

    try {
      await post("/api/usuarios", dataToSend); // Usamos el método post del hook
      Notiflix.Notify.success("Usuario creado exitosamente");
      setFormData({
        nombre: "",
        cedula: "",
        correo: "",
        numeroContrato: "",
        duracionMeses: "",
        fechaInicio: "",
        fechaFinalizacion: "",
        rol: "",
        direccion: "",
        comuna: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      setOpen(false);
      fetchUsers(); // 🔄 Actualizar la tabla
    } catch (error) {
      // El hook ya maneja el error y muestra la notificación con Notiflix
      console.error("Error al crear usuario:", error); // Opcional: log para depuración
    }
  };

  return (
    <Card>
      <CardContent className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Creacion de Usuarios
          </h1>
          <p className="text-muted-foreground flex items-center mt-1">
            <CalendarDays className="mr-1 h-4 w-4 text-foreground" />
            {formattedDate}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Crear Usuario</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cedula">Cédula</Label>
                      <Input
                        id="cedula"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="correo">Correo</Label>
                      <Input
                        id="correo"
                        name="correo"
                        type="email"
                        value={formData.correo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="numeroContrato">Número de Contrato</Label>
                      <Input
                        id="numeroContrato"
                        name="numeroContrato"
                        value={formData.numeroContrato}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duracionMeses">Duración (meses)</Label>
                      <Input
                        id="duracionMeses"
                        name="duracionMeses"
                        type="number"
                        value={formData.duracionMeses}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.fechaInicio && "text-muted-foreground"
                            )}
                          >
                            {formData.fechaInicio ? (
                              format(new Date(formData.fechaInicio), "PPP", {
                                locale: es,
                              })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarDays className="ml-auto h-4 w-4 text-foreground" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              formData.fechaInicio
                                ? new Date(formData.fechaInicio)
                                : undefined
                            }
                            onSelect={(date) =>
                              handleDateChange("fechaInicio", date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="fechaFinalizacion">
                        Fecha de Finalización
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.fechaFinalizacion &&
                                "text-muted-foreground"
                            )}
                          >
                            {formData.fechaFinalizacion ? (
                              format(
                                new Date(formData.fechaFinalizacion),
                                "PPP",
                                { locale: es }
                              )
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarDays className="ml-auto h-4 w-4 text-foreground" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              formData.fechaFinalizacion
                                ? new Date(formData.fechaFinalizacion)
                                : undefined
                            }
                            onSelect={(date) =>
                              handleDateChange("fechaFinalizacion", date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="rol">Rol</Label>
                      <Select
                        onValueChange={handleSelectChange}
                        value={formData.rol}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">ADMINISTRADOR</SelectItem>
                          <SelectItem value="user">TRABAJADOR</SelectItem>
                          <SelectItem value="guest">PROVEEDOR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="direccion">Dirección de Residencia</Label>
                      <Input
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="comuna">Comuna</Label>
                      <Input
                        id="comuna"
                        name="comuna"
                        value={formData.comuna}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">
                        Confirmar Contraseña
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollArea>
                <Button type="submit" className="w-full mt-4">
                  Crear Usuario
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
