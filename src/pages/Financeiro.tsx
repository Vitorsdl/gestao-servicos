import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DashboardCard from "@/components/DashboardCard";
import { Plus, DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { toast } from "sonner";

interface ServicoFinalizado {
  id: string;
  valor: number;
  cliente: string;
  tipoServico: "reparo" | "pintura";
  dataFinalizacao: Date;
}

interface Despesa {
  id: string;
  descricao: string;
  valor: number;
  data: Date;
}

// Mock data
const mockServicosFinalizados: ServicoFinalizado[] = [
  {
    id: "1",
    valor: 1500,
    cliente: "João Silva",
    tipoServico: "reparo",
    dataFinalizacao: new Date("2024-01-15"),
  },
  {
    id: "2",
    valor: 3200,
    cliente: "Maria Santos",
    tipoServico: "pintura",
    dataFinalizacao: new Date("2024-01-20"),
  },
  {
    id: "3",
    valor: 2100,
    cliente: "Ana Costa",
    tipoServico: "pintura",
    dataFinalizacao: new Date("2024-01-25"),
  },
];

const mockDespesas: Despesa[] = [
  {
    id: "1",
    descricao: "Material de pintura",
    valor: 450,
    data: new Date("2024-01-10"),
  },
  {
    id: "2",
    descricao: "Ferramentas de reparo",
    valor: 280,
    data: new Date("2024-01-18"),
  },
];

export default function Financeiro() {
  const [servicosFinalizados] = useState<ServicoFinalizado[]>(mockServicosFinalizados);
  const [despesas, setDespesas] = useState<Despesa[]>(mockDespesas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    descricao: "",
    valor: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.descricao || !formData.valor) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const novaDespesa: Despesa = {
      id: Date.now().toString(),
      descricao: formData.descricao,
      valor: parseFloat(formData.valor),
      data: new Date(),
    };

    setDespesas([novaDespesa, ...despesas]);
    setFormData({ descricao: "", valor: "" });
    setIsDialogOpen(false);
    toast.success("Despesa adicionada com sucesso!");
  };

  // Cálculos financeiros
  const receitaTotal = servicosFinalizados.reduce((total, servico) => total + servico.valor, 0);
  const despesaTotal = despesas.reduce((total, despesa) => total + despesa.valor, 0);
  const lucroTotal = receitaTotal - despesaTotal;
  const mediaFaturamento = servicosFinalizados.length > 0 ? receitaTotal / servicosFinalizados.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">
            Controle suas receitas e despesas
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-main shadow-soft hover:shadow-medium transition-smooth">
              <Plus className="h-4 w-4 mr-2" />
              Nova Despesa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Despesa</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição da Despesa</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva a despesa"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, valor: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-main">
                  Adicionar Despesa
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Indicadores Financeiros */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Receita Total"
          value={`R$ ${receitaTotal.toLocaleString("pt-BR")}`}
          icon={TrendingUp}
          variant="success"
          subtitle="Serviços finalizados"
        />
        <DashboardCard
          title="Despesas Total"
          value={`R$ ${despesaTotal.toLocaleString("pt-BR")}`}
          icon={TrendingDown}
          variant="destructive"
          subtitle="Gastos do período"
        />
        <DashboardCard
          title="Lucro Líquido"
          value={`R$ ${lucroTotal.toLocaleString("pt-BR")}`}
          icon={DollarSign}
          variant={lucroTotal >= 0 ? "success" : "destructive"}
          subtitle="Receita - Despesas"
        />
        <DashboardCard
          title="Média por Serviço"
          value={`R$ ${mediaFaturamento.toLocaleString("pt-BR")}`}
          icon={TrendingUp}
          variant="default"
          subtitle="Faturamento médio"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Serviços Finalizados */}
        <Card className="shadow-medium border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Serviços Finalizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {servicosFinalizados.map((servico) => (
                <div
                  key={servico.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-success-light border border-success/20"
                >
                  <div>
                    <p className="font-semibold">{servico.cliente}</p>
                    <p className="text-sm text-muted-foreground">
                      {servico.tipoServico === "reparo" ? "Reparo" : "Pintura"} • {" "}
                      {servico.dataFinalizacao.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">
                      R$ {servico.valor.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}

              {servicosFinalizados.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum serviço finalizado ainda</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Despesas */}
        <Card className="shadow-medium border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-destructive" />
              Despesas do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {despesas.map((despesa) => (
                <div
                  key={despesa.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-destructive-light border border-destructive/20"
                >
                  <div>
                    <p className="font-semibold">{despesa.descricao}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {despesa.data.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-destructive">
                      -R$ {despesa.valor.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}

              {despesas.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <TrendingDown className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma despesa registrada</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}