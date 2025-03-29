import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { loginSuccess } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function EmcaliIcon() {
  return (
    <img
      src="/images/LOGO-EMCALI.png"
      alt="Emcali Icon"
      className="h-[100px] w-[273px] mx-auto block"
    />
  );
}

interface SignInCardProps extends React.ComponentProps<typeof Card> {}

export default function SignInCard({ className, ...props }: SignInCardProps) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = () => {
    const correo = document.getElementById("correo") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!correo.value || !/\S+@\S+\.\S+/.test(correo.value)) {
      setEmailError(true);
      setEmailErrorMessage("Ingrese un correo válido.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("La password debe tener al menos 6 caracteres.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }
    console.log("Validación completada:", isValid);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const correo = (document.getElementById("correo") as HTMLInputElement)
      .value;
    const data = {
      correo,
      password: (document.getElementById("password") as HTMLInputElement).value,
    };

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, user } = response.data;

      dispatch(
        loginSuccess({
          token,
          user,
        })
      );

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rol", user.role);

      console.log("Contenido de localStorage (user):", user);

      const targetRoute = (() => {
        switch (user.rol) {
          case "ADMINISTRADOR":
            return "/dashboard";
          case "OPERARIO":
            return "/ConfirmarDescarga";
          case "VIGILANCIA":
            return "/ConfirmarIngreso";
          case "COORDINADOR":
            return "/RgVactor";
          default:
            Notify.warning(
              "Rol no reconocido, redirigiendo a página por defecto."
            );
            return "/";
        }
      })();

      navigate(targetRoute);
    } catch (error: any) {
      console.error("Detalles del error:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Ocurrió un error inesperado. Por favor, intente nuevamente.";

      Notify.failure(errorMessage);
    }
  };

  return (
    <Card
      className={`flex flex-col self-center w-full p-6 gap-4 sm:w-[450px] 
      shadow-[hsla(220,30%,5%,0.05)_0px_5px_15px_0px,hsla(220,25%,10%,0.05)_0px_15px_35px_-5px]
      dark:shadow-[hsla(220,30%,5%,0.5)_0px_5px_15px_0px,hsla(220,25%,10%,0.08)_0px_15px_35px_-5px]
      ${className || ""}`}
      {...props}
    >
      <EmcaliIcon />

      <h1 className="w-full text-center text-[clamp(2rem,10vw,2.15rem)] font-bold">
        Iniciar Sesión
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <div className="grid gap-2">
          <Label htmlFor="correo">Correo</Label>
          <Input
            id="correo"
            type="email"
            placeholder="usuario@correo.com"
            className={emailError ? "border-red-500" : ""}
          />
          {emailError && (
            <p className="text-sm text-red-500">{emailErrorMessage}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••"
            className={passwordError ? "border-red-500" : ""}
          />
          {passwordError && (
            <p className="text-sm text-red-500">{passwordErrorMessage}</p>
          )}
        </div>

        <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700">
          Ingresar
        </Button>
      </form>
    </Card>
  );
}
