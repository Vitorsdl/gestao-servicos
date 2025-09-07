import { useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Wrench, Palette, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data - em uma aplicação real, viria de uma API
const mockData = [
  { mes: "Jan", valor: 15000 },
  { mes: "Fev", valor: 18000 },
  { mes: "Mar", valor: 22000 },
  { mes: "Abr", valor: 19000 },
  { mes: "Mai", valor: 25000 },
  { mes: "Jun", valor: 28000 },
];

export default function Dashboard() {
  const [chartData] = useState(mockData);

  // Mock statistics
  const stats = {
    orcamentosDoMes: 12,
    reparosAndamento: 5,
    pinturasAndamento: 3,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho do seu negócio
        </p>
      </div>

      {/* Cards de Indicadores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Orçamentos no Mês"
          value={stats.orcamentosDoMes}
          icon={FileText}
          variant="default"
          subtitle="Novos orçamentos criados"
        />
        <DashboardCard
          title="Reparos em Andamento"
          value={stats.reparosAndamento}
          icon={Wrench}
          variant="warning"
          subtitle="Serviços em execução"
        />
        <DashboardCard
          title="Pinturas em Andamento"
          value={stats.pinturasAndamento}
          icon={Palette}
          variant="success"
          subtitle="Projetos de pintura ativos"
        />
      </div>

      {/* Gráfico de Evolução Mensal */}
      <Card className="shadow-medium border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Evolução Mensal dos Valores (R$)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="mes"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                  tickFormatter={(value) =>
                    `R$ ${(value / 1000).toFixed(0)}k`
                  }
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-card p-3 shadow-large">
                          <div className="text-sm font-medium">{label}</div>
                          <div className="text-lg font-bold text-primary">
                            R$ {payload[0].value?.toLocaleString("pt-BR")}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                  className="transition-smooth"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}