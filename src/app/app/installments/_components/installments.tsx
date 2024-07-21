/**
 * v0 by Vercel.
 * @see https://v0.dev/t/toCpIddp2q6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
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

export default function InstallmentsPage() {
  const [search, setSearch] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCharge, setNewCharge] = useState({ client: "", value: "" });

  const charges = [
    {
      id: 1,
      client: "João da Silva",
      value: 150.0,
      whatsappLink: "https://wa.me/5511999999999",
      status: "Pendente",
    },
    {
      id: 2,
      client: "Maria Oliveira",
      value: 250.0,
      whatsappLink: "https://wa.me/5511888888888",
      status: "Pago",
    },
    {
      id: 3,
      client: "Pedro Almeida",
      value: 80.0,
      whatsappLink: "https://wa.me/5511777777777",
      status: "Atrasado",
    },
    {
      id: 4,
      client: "Ana Souza",
      value: 300.0,
      whatsappLink: "https://wa.me/5511666666666",
      status: "Pendente",
    },
    {
      id: 5,
      client: "Lucas Fernandes",
      value: 120.0,
      whatsappLink: "https://wa.me/5511555555555",
      status: "Pago",
    },
    {
      id: 6,
      client: "Fernanda Rodrigues",
      value: 180.0,
      whatsappLink: "https://wa.me/5511444444444",
      status: "Pendente",
    },
    {
      id: 7,
      client: "Gustavo Alves",
      value: 220.0,
      whatsappLink: "https://wa.me/5511333333333",
      status: "Pago",
    },
    {
      id: 8,
      client: "Isabela Souza",
      value: 90.0,
      whatsappLink: "https://wa.me/5511222222222",
      status: "Atrasado",
    },
  ];

  const filteredCharges = charges.filter((charge) => {
    const clientMatch =
      search === "" ||
      charge.client.toLowerCase().includes(search.toLowerCase());
    const valueMatch =
      (minValue === "" || charge.value >= parseFloat(minValue)) &&
      (maxValue === "" || charge.value <= parseFloat(maxValue));
    return clientMatch && valueMatch;
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
          {filteredCharges.map((charge) => (
            <TableRow key={charge.id}>
              <TableCell>{charge.client}</TableCell>
              <TableCell>R$ {charge.value.toFixed(2)}</TableCell>
              <TableCell>
                <Link href="#" target="_blank" prefetch={false}>
                  Enviar mensagem
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    charge.status === "Pendente"
                      ? "warning"
                      : charge.status === "Pago"
                      ? "success"
                      : "danger"
                  }
                >
                  {charge.status}
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
                value={newCharge.client}
                className="col-span-3"
                onValueChange={(e) =>
                  setNewCharge({ ...newCharge, client: e.target.value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {charges.map((charge) => (
                    <SelectItem key={charge.id} value={charge.client}>
                      {charge.client}
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
                value={newCharge.value}
                onChange={(e) =>
                  setNewCharge({ ...newCharge, value: e.target.value })
                }
                className="col-span-3"
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
                setShowModal(false);
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
