import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center p-4 bg-[#1a3c34]/80 backdrop-blur-md shadow-sm z-50">
      <div className="text-2xl font-bold" style={{ color: "#2d6c0d" }}>
        VertiEM
      </div>

      <Button
        style={{ backgroundColor: "#2d6c0d" }}
        asChild
        className="text-white rounded-full px-6 py-2 shadow-md hover:shadow-lg"
      >
        <Link to="/login">Ingresar</Link>
      </Button>
    </header>
  );
};
