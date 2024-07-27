/**
 * v0 by Vercel.
 * @see https://v0.dev/t/toCpIddp2q6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

interface installmentCreater {
  clientId: number;
  amount: number;
  dueDate: Date;
}

export default function InstallmentsPage({
  clients,
  installments,
  createInstallment,
}: any) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCharge, setNewCharge] = useState({
    clientId: -1,
    amount: -1,
    dueDate: new Date(),
  });

  const filteredInstallments = installments.filter((charge: any) => {
    const clientMatch =
      search === "" ||
      charge.client.toLowerCase().includes(search.toLowerCase());

    const valueMatch =
      (minValue === "" || charge.value >= parseFloat(minValue)) &&
      (maxValue === "" || charge.value <= parseFloat(maxValue));

    const statusMatch =
      selectedStatus === "" ||
      selectedStatus === "TODOS" ||
      charge.status === selectedStatus;

    return clientMatch && valueMatch && statusMatch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-5">
        <h1 className="text-2xl font-bold">Cobranças</h1>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Input
            placeholder="Filtrar por cliente"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Valor mínimo"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Valor máximo"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Pago">Pago</SelectItem>
                  <SelectItem value="Atrasado">Atrasado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setShowModal(true)}>
            Criar nova cobrança
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInstallments.map((installment: any) => (
            <TableRow key={installment.id}>
              <TableCell>{installment.client}</TableCell>
              <TableCell>R$ {installment.value.toFixed(2)}</TableCell>
              <TableCell>
                <Link href="#" target="_blank" prefetch={false}>
                  Enviar mensagem
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    installment.status === "Pendente"
                      ? "default"
                      : installment.status === "Pago"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {installment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nova cobrança</DialogTitle>
            <DialogDescription>
              Preencha os dados da nova cobrança.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="client" className="text-right">
                Cliente
              </Label>
              <Select
                id="client"
                className="col-span-3"
                required
                onValueChange={(clientId) => {
                  let newChargeInstance = newCharge;
                  newChargeInstance.clientId = Number(clientId);
                  setNewCharge(newChargeInstance);
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client: any) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="value" className="text-right">
                Valor
              </Label>
              <Input
                id="value"
                type="number"
                required
                onChange={(e) => {
                  let newChargeInstance = newCharge;
                  newChargeInstance.amount = Number(e.target.value);
                  setNewCharge(newChargeInstance);
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="paymentDate" className="text-right">
                Dia do acerto
              </Label>
              <Input
                id="paymentDate"
                type="date"
                required
                onChange={(e) => {
                  let newChargeInstance = newCharge;
                  newChargeInstance.dueDate = new Date(e.target.value);
                  setNewCharge(newChargeInstance);
                }}
                className="col-span-2 "
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (!newCharge.clientId) return;
                if (!newCharge.amount) return;
                if (!newCharge.dueDate) return;

                createInstallment(newCharge);
                router.refresh();
              }}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
