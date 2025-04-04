import * as React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/ScrollArea";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function EmcaliIcon() {
  return (
    <img
      src="/images/LOGO-EMCALI.png"
      alt="Emcali Icon"
      className="h-16 w-auto mx-auto"
    />
  );
}

// Lista de comunas
const comunas = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
];

export default function RegistroForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({
    nombre: "",
    cedula: "",
    correo: "",
    contrato: "",
    duracion: "",
    fechaInicio: "",
    fechaFin: "",
    direccion: "",
    comuna: "",
    password: "",
    confirmPassword: "",
  });

  // Estados para los campos del formulario
  const [nombre, setNombre] = React.useState("");
  const [cedula, setCedula] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [contrato, setContrato] = React.useState("");
  const [duracion, setDuracion] = React.useState("");
  const [fechaInicio, setFechaInicio] = React.useState<Date | undefined>(
    undefined
  );
  const [fechaFin, setFechaFin] = React.useState<Date | undefined>(undefined);
  const [direccion, setDireccion] = React.useState("");
  const [comuna, setComuna] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Función para establecer la fecha de finalización automáticamente basada en la fecha de inicio y duración
  React.useEffect(() => {
    if (fechaInicio && duracion) {
      const meses = parseInt(duracion);
      if (!isNaN(meses)) {
        const fechaFinalizacion = new Date(fechaInicio);
        fechaFinalizacion.setMonth(fechaFinalizacion.getMonth() + meses);
        setFechaFin(fechaFinalizacion);
      }
    }
  }, [fechaInicio, duracion]);

  const validateForm = () => {
    const errors = {
      nombre: "",
      cedula: "",
      correo: "",
      contrato: "",
      duracion: "",
      fechaInicio: "",
      fechaFin: "",
      direccion: "",
      comuna: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    // Validar nombre
    if (!nombre.trim()) {
      errors.nombre = "El nombre es requerido";
      isValid = false;
    }

    // Validar cédula
    if (!cedula.trim()) {
      errors.cedula = "La cédula es requerida";
      isValid = false;
    } else if (!/^\d+$/.test(cedula)) {
      errors.cedula = "La cédula debe contener solo números";
      isValid = false;
    }

    // Validar correo
    if (!correo.trim()) {
      errors.correo = "El correo es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      errors.correo = "Ingrese un correo válido";
      isValid = false;
    }

    // Validar número de contrato
    if (!contrato.trim()) {
      errors.contrato = "El número de contrato es requerido";
      isValid = false;
    }

    // Validar duración
    if (!duracion.trim()) {
      errors.duracion = "La duración es requerida";
      isValid = false;
    } else if (!/^\d+$/.test(duracion)) {
      errors.duracion = "La duración debe ser un número";
      isValid = false;
    }

    // Validar fecha de inicio
    if (!fechaInicio) {
      errors.fechaInicio = "La fecha de inicio es requerida";
      isValid = false;
    }

    // Validar fecha de fin
    if (!fechaFin) {
      errors.fechaFin = "La fecha de finalización es requerida";
      isValid = false;
    }

    // Validar dirección
    if (!direccion.trim()) {
      errors.direccion = "La dirección es requerida";
      isValid = false;
    }

    // Validar comuna
    if (!comuna) {
      errors.comuna = "La comuna es requerida";
      isValid = false;
    }

    // Validar contraseña
    if (!password) {
      errors.password = "La contraseña es requerida";
      isValid = false;
    } else if (password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
      isValid = false;
    }

    // Validar confirmación de contraseña
    if (!confirmPassword) {
      errors.confirmPassword = "Debe confirmar la contraseña";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    // Crear objeto de datos para enviar al servidor
    const data = {
      nombre,
      cedula,
      correo,
      numeroContrato: contrato,
      duracionMeses: parseInt(duracion),
      fechaInicio: fechaInicio?.toISOString(),
      fechaFinalizacion: fechaFin?.toISOString(),
      direccion,
      comuna,
      password,
    };

    try {
      const response = await axios.post(`${baseUrl}/usuarios`, data);
      console.log("Registro exitoso:", response.data);

      // Mostrar mensaje de éxito
      Notify.success("Registro completado con éxito");

      // Redireccionar al login
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      console.error("Error al registrar:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Ocurrió un error al registrar. Por favor, intente nuevamente.";

      Notify.failure(errorMessage);
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4 py-8"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
      <Card className="w-full max-w-3xl shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <EmcaliIcon />
          <h1 className="text-3xl font-bold">Registro de Usuario</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Complete todos los campos para crear su cuenta
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre completo */}
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Juan Pérez"
                  className={formErrors.nombre ? "border-red-500" : ""}
                />
                {formErrors.nombre && (
                  <p className="text-sm text-red-500">{formErrors.nombre}</p>
                )}
              </div>

              {/* Cédula */}
              <div className="space-y-2">
                <Label htmlFor="cedula">Número de Cédula</Label>
                <Input
                  id="cedula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="1234567890"
                  className={formErrors.cedula ? "border-red-500" : ""}
                />
                {formErrors.cedula && (
                  <p className="text-sm text-red-500">{formErrors.cedula}</p>
                )}
              </div>

              {/* Correo */}
              <div className="space-y-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input
                  id="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="usuario@correo.com"
                  className={formErrors.correo ? "border-red-500" : ""}
                />
                {formErrors.correo && (
                  <p className="text-sm text-red-500">{formErrors.correo}</p>
                )}
              </div>

              {/* Número de contrato */}
              <div className="space-y-2">
                <Label htmlFor="contrato">Número de Contrato</Label>
                <Input
                  id="contrato"
                  value={contrato}
                  onChange={(e) => setContrato(e.target.value)}
                  placeholder="CT-2025-001"
                  className={formErrors.contrato ? "border-red-500" : ""}
                />
                {formErrors.contrato && (
                  <p className="text-sm text-red-500">{formErrors.contrato}</p>
                )}
              </div>

              {/* Duración en meses */}
              <div className="space-y-2">
                <Label htmlFor="duracion">Duración (meses)</Label>
                <Input
                  id="duracion"
                  value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}
                  placeholder="12"
                  className={formErrors.duracion ? "border-red-500" : ""}
                />
                {formErrors.duracion && (
                  <p className="text-sm text-red-500">{formErrors.duracion}</p>
                )}
              </div>

              {/* Fecha de inicio */}
              <div className="space-y-2">
                <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="fechaInicio"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fechaInicio && "text-muted-foreground",
                        formErrors.fechaInicio && "border-red-500"
                      )}
                    >
                      {fechaInicio ? (
                        format(fechaInicio, "dd/MM/yyyy")
                      ) : (
                        <span>Seleccione fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fechaInicio}
                      onSelect={setFechaInicio}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formErrors.fechaInicio && (
                  <p className="text-sm text-red-500">
                    {formErrors.fechaInicio}
                  </p>
                )}
              </div>

              {/* Fecha de finalización */}
              <div className="space-y-2">
                <Label htmlFor="fechaFin">Fecha de Finalización</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="fechaFin"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fechaFin && "text-muted-foreground",
                        formErrors.fechaFin && "border-red-500"
                      )}
                    >
                      {fechaFin ? (
                        format(fechaFin, "dd/MM/yyyy")
                      ) : (
                        <span>Seleccione fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fechaFin}
                      onSelect={setFechaFin}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formErrors.fechaFin && (
                  <p className="text-sm text-red-500">{formErrors.fechaFin}</p>
                )}
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    className={
                      formErrors.password ? "border-red-500 pr-10" : "pr-10"
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formErrors.password && (
                  <p className="text-sm text-red-500">{formErrors.password}</p>
                )}
              </div>

              {/* Confirmar Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme su contraseña"
                    className={
                      formErrors.confirmPassword
                        ? "border-red-500 pr-10"
                        : "pr-10"
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Dirección de residencia */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="direccion">Dirección de Residencia</Label>
                <Input
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Calle 1 # 2-34"
                  className={formErrors.direccion ? "border-red-500" : ""}
                />
                {formErrors.direccion && (
                  <p className="text-sm text-red-500">{formErrors.direccion}</p>
                )}
              </div>

              {/* Comuna */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="comuna">Comuna</Label>
                <Select value={comuna} onValueChange={setComuna}>
                  <SelectTrigger
                    className={formErrors.comuna ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Seleccione su comuna" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-[60vh] pr-4">
                      {comunas.map((com) => (
                        <SelectItem key={com} value={com}>
                          {com}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                {formErrors.comuna && (
                  <p className="text-sm text-red-500">{formErrors.comuna}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Procesando..." : "Completar Registro"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center space-x-4 text-sm text-gray-500">
          <span>¿Ya tiene una cuenta?</span>
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => navigate("/")}
          >
            Iniciar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
