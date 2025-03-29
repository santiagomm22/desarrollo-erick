// src/components/layouts/Sidebar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Truck,
  Building2,
  FileText,
  Database,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/ScrollArea";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "../../store/slices/authSlice";
import { cn } from "./cn";

interface SidebarProps {
  onClose?: () => void;
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Solicitudes", href: "/solicitudes", icon: FileText },
  { name: "Empresas", href: "/empresas", icon: Building2 },
  { name: "Conductores", href: "/conductores", icon: Users },
  { name: "Vehículos", href: "/vehiculos", icon: Truck },
  {
    name: "Catálogos",
    href: "/catalogos",
    icon: Database,
    submenu: [
      { name: "EPS", href: "/catalogos/eps" },
      { name: "ARL", href: "/catalogos/arl" },
      { name: "Tipos de Vertimiento", href: "/catalogos/tipos-vertimiento" },
      { name: "Causales", href: "/catalogos/causales" },
    ],
  },
  { name: "Reportes", href: "/reportes", icon: BarChart },
  {
    name: "Usuarios",
    href: "/usuarios",
    icon: Settings,
    roles: ["ADMINISTRADOR"],
  },
];

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = localStorage.getItem("rol") || (user?.rol as string);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    if (onClose) onClose();
  };

  const filteredNavItems = navItems.filter((item) => {
    if (item.roles && userRole) {
      return item.roles.includes(userRole);
    }
    return true;
  });

  const isActive = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(`${href}/`)
    );
  };

  const renderNavItems = () => (
    <>
      {filteredNavItems.map((item, index) => {
        const active = isActive(item.href);
        const Icon = item.icon;

        return (
          <div key={index}>
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                active ? "bg-accent text-accent-foreground" : "transparent"
              )}
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>

            {item.submenu && (
              <div className="ml-6 mt-1 grid gap-1">
                {item.submenu.map((subItem, subIndex) => {
                  const isSubActive = isActive(subItem.href);

                  return (
                    <Link
                      key={subIndex}
                      to={subItem.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        isSubActive
                          ? "bg-accent/50 text-accent-foreground"
                          : "transparent"
                      )}
                      onClick={() => {
                        if (onClose) onClose();
                      }}
                    >
                      <span>{subItem.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-primary font-bold text-xl">VERTIEM</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">{renderNavItems()}</nav>
      </ScrollArea>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
