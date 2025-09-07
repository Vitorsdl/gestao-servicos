import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  subtitle?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  variant = "default",
  subtitle,
}: DashboardCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-gradient-success shadow-soft";
      case "warning":
        return "border-warning/20 bg-gradient-to-br from-warning/10 to-warning/5 shadow-soft";
      case "destructive":
        return "border-destructive/20 bg-gradient-to-br from-destructive/10 to-destructive/5 shadow-soft";
      default:
        return "bg-gradient-card shadow-soft border-border/50";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "success":
        return "text-success-foreground";
      case "warning":
        return "text-warning";
      case "destructive":
        return "text-destructive";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={`transition-smooth hover:shadow-medium ${getVariantStyles()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${getIconStyles()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}