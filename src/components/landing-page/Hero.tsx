import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="text-white" style={{ backgroundColor: "#25580c" }}>
      {/* Espacio vacío para que el fondo del Hero se vea detrás del header */}
      <div
        className="w-full h-16" // Ajusta 'h-16' según la altura de tu header
        style={{ backgroundColor: "#25580c" }}
      ></div>

      {/* Contenido principal del Hero */}
      <div className="flex flex-col md:flex-row items-center p-8">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Bienvenido a VertiEM
          </h1>
          <p className="text-lg">
            El aplicativo para gestionar las visitas y descargas en la planta de
            tratamiento de aguas residuales de EMCALI (PTAR)
          </p>
          <Button className="text-black" variant="outline">
            <Link to="/login">Ingresar</Link>
          </Button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="images/foto-ptar.jpg"
            alt="Modern Interior"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
