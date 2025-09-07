import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "aceito" | "recusado" | "pendente" | "em_andamento" | "finalizado";
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "aceito":
        return {
          label: "Aceito",
          className: "bg-success text-success-foreground border-success",
        };
      case "recusado":
        return {
          label: "Recusado",
          className: "bg-destructive text-destructive-foreground border-destructive",
        };
      case "pendente":
        return {
          label: "Pendente",
          className: "bg-warning text-warning-foreground border-warning",
        };
      case "em_andamento":
        return {
          label: "Em Andamento",
          className: "bg-primary text-primary-foreground border-primary",
        };
      case "finalizado":
        return {
          label: "Finalizado",
          className: "bg-success text-success-foreground border-success",
        };
      default:
        return {
          label: "Desconhecido",
          className: "bg-muted text-muted-foreground border-muted",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge className={`${config.className} ${className || ""}`}>
      {config.label}
    </Badge>
  );
}