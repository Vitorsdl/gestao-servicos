import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, MapPin, User, DollarSign, Clock } from "lucide-react";

interface ServicoAndamento {
  id: string;
  valor: number;
  endereco: string;
  cliente: string;
  tipoServico: "reparo" | "pintura";
  prazoFinalizacao: Date;
  status: "em_andamento";
  dataInicio: Date;
}

// Mock data
const mockServicos: ServicoAndamento[] = [
  {
    id: "1",
    valor: 1500,
    endereco: "Rua das Flores, 123",
    cliente: "João Silva",
    tipoServico: "reparo",
    prazoFinalizacao: new Date("2024-02-15"),
    status: "em_andamento",
    dataInicio: new Date("2024-01-20"),
  },
  {
    id: "2",
    valor: 3200,
    endereco: "Av. Central, 456",
    cliente: "Maria Santos",
    tipoServico: "pintura",
    prazoFinalizacao: new Date("2024-02-28"),
    status: "em_andamento",
    dataInicio: new Date("2024-01-25"),
  },
  {
    id: "3",
    valor: 2100,
    endereco: "Rua do Sol, 321",
    cliente: "Ana Costa",
    tipoServico: "pintura",
    prazoFinalizacao: new Date("2024-02-10"),
    status: "em_andamento",
    dataInicio: new Date("2024-01-18"),
  },
  {
    id: "4",
    valor: 900,
    endereco: "Av. das Palmeiras, 654",
    cliente: "Carlos Oliveira",
    tipoServico: "reparo",
    prazoFinalizacao: new Date("2024-02-05"),
    status: "em_andamento",
    dataInicio: new Date("2024-01-22"),
  },
  {
    id: "5",
    valor: 4500,
    endereco: "Rua Nova, 987",
    cliente: "Fernanda Lima",
    tipoServico: "pintura",
    prazoFinalizacao: new Date("2024-03-10"),
    status: "em_andamento",
    dataInicio: new Date("2024-01-30"),
  },
];

export default function Servicos() {
  const [servicos] = useState<ServicoAndamento[]>(mockServicos);

  const getDaysUntilDeadline = (prazo: Date) => {
    const hoje = new Date();
    const diffTime = prazo.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyVariant = (days: number) => {
    if (days < 0) return "destructive";
    if (days <= 3) return "warning";
    return "default";
  };

  const getTipoServicoIcon = (tipo: "reparo" | "pintura") => {
    return tipo === "reparo" ? "🔧" : "🎨";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Serviços em Andamento</h1>
        <p className="text-muted-foreground">
          Acompanhe o progresso dos seus serviços ativos
        </p>
      </div>

      <div className="grid gap-4">
        {servicos.map((servico) => {
          const diasRestantes = getDaysUntilDeadline(servico.prazoFinalizacao);
          const urgencyVariant = getUrgencyVariant(diasRestantes);

          return (
            <Card
              key={servico.id}
              className="shadow-soft hover:shadow-medium transition-smooth"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">
                      {getTipoServicoIcon(servico.tipoServico)}
                    </span>
                    {servico.tipoServico === "reparo" ? "Reparo" : "Pintura"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <StatusBadge status={servico.status} />
                    <Badge variant={urgencyVariant === "destructive" ? "destructive" : urgencyVariant === "warning" ? "secondary" : "outline"}>
                      {diasRestantes < 0
                        ? `${Math.abs(diasRestantes)} dias atrasado`
                        : diasRestantes === 0
                        ? "Prazo hoje"
                        : `${diasRestantes} dias restantes`}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Valor</p>
                      <p className="font-semibold">
                        R$ {servico.valor.toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="font-semibold">{servico.cliente}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Endereço</p>
                      <p className="font-semibold text-sm">{servico.endereco}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Início</p>
                      <p className="font-semibold">
                        {servico.dataInicio.toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prazo</p>
                      <p className={`font-semibold ${
                        urgencyVariant === "destructive" 
                          ? "text-destructive" 
                          : urgencyVariant === "warning" 
                          ? "text-warning" 
                          : ""
                      }`}>
                        {servico.prazoFinalizacao.toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Progresso estimado</span>
                    <span>Em andamento</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-main transition-smooth" 
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {servicos.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhum serviço em andamento</h3>
            <p>Quando você aceitar orçamentos, eles aparecerão aqui como serviços em andamento.</p>
          </div>
        </Card>
      )}
    </div>
  );
}