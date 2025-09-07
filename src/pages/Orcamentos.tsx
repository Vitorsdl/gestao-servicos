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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import StatusBadge from "@/components/StatusBadge";
import { Plus, MapPin, User, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface Orcamento {
  id: string;
  valor: number;
  endereco: string;
  cliente: string;
  tipoServico: "reparo" | "pintura";
  status: "aceito" | "recusado" | "pendente";
  dataCriacao: Date;
}

// Mock data
const mockOrcamentos: Orcamento[] = [
  {
    id: "1",
    valor: 1500,
    endereco: "Rua das Flores, 123",
    cliente: "João Silva",
    tipoServico: "reparo",
    status: "aceito",
    dataCriacao: new Date("2024-01-15"),
  },
  {
    id: "2",
    valor: 3200,
    endereco: "Av. Central, 456",
    cliente: "Maria Santos",
    tipoServico: "pintura",
    status: "pendente",
    dataCriacao: new Date("2024-01-20"),
  },
  {
    id: "3",
    valor: 800,
    endereco: "Rua do Comércio, 789",
    cliente: "Pedro Costa",
    tipoServico: "reparo",
    status: "recusado",
    dataCriacao: new Date("2024-01-18"),
  },
];

export default function Orcamentos() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>(mockOrcamentos);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    valor: "",
    endereco: "",
    cliente: "",
    tipoServico: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.valor || !formData.endereco || !formData.cliente || !formData.tipoServico) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const novoOrcamento: Orcamento = {
      id: Date.now().toString(),
      valor: parseFloat(formData.valor),
      endereco: formData.endereco,
      cliente: formData.cliente,
      tipoServico: formData.tipoServico as "reparo" | "pintura",
      status: "pendente",
      dataCriacao: new Date(),
    };

    setOrcamentos([novoOrcamento, ...orcamentos]);
    setFormData({ valor: "", endereco: "", cliente: "", tipoServico: "" });
    setIsDialogOpen(false);
    toast.success("Orçamento criado com sucesso!");
  };

  const updateStatus = (id: string, status: "aceito" | "recusado") => {
    setOrcamentos(
      orcamentos.map((orc) =>
        orc.id === id ? { ...orc, status } : orc
      )
    );
    toast.success(`Orçamento ${status === "aceito" ? "aceito" : "recusado"}!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os seus orçamentos
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-main shadow-soft hover:shadow-medium transition-smooth">
              <Plus className="h-4 w-4 mr-2" />
              Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Orçamento</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="cliente">Nome do Cliente</Label>
                <Input
                  id="cliente"
                  placeholder="Digite o nome do cliente"
                  value={formData.cliente}
                  onChange={(e) =>
                    setFormData({ ...formData, cliente: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Textarea
                  id="endereco"
                  placeholder="Digite o endereço completo"
                  value={formData.endereco}
                  onChange={(e) =>
                    setFormData({ ...formData, endereco: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoServico">Tipo de Serviço</Label>
                <Select
                  value={formData.tipoServico}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipoServico: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reparo">Reparo</SelectItem>
                    <SelectItem value="pintura">Pintura</SelectItem>
                  </SelectContent>
                </Select>
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
                  Criar Orçamento
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {orcamentos.map((orcamento) => (
          <Card key={orcamento.id} className="shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {orcamento.tipoServico === "reparo" ? "Reparo" : "Pintura"}
                </CardTitle>
                <StatusBadge status={orcamento.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="font-semibold">
                      R$ {orcamento.valor.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                    <p className="font-semibold">{orcamento.cliente}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Endereço</p>
                    <p className="font-semibold text-sm">{orcamento.endereco}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="font-semibold">
                      {orcamento.dataCriacao.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>

              {orcamento.status === "pendente" && (
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    className="bg-gradient-success text-success-foreground"
                    onClick={() => updateStatus(orcamento.id, "aceito")}
                  >
                    Aceitar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateStatus(orcamento.id, "recusado")}
                  >
                    Recusar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}