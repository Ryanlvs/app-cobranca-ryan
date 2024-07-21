/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X2vMQOpIp5o
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Costumers() {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "555-1234",
      totalInstallments: 12,
      paidInstallments: 8,
      pendingInstallments: 4,
      pendingAmount: 500.0,
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "555-5678",
      totalInstallments: 6,
      paidInstallments: 4,
      pendingInstallments: 2,
      pendingAmount: 200.0,
    },
    {
      id: 3,
      name: "Michael Johnson",
      phone: "555-9012",
      totalInstallments: 10,
      paidInstallments: 7,
      pendingInstallments: 3,
      pendingAmount: 350.0,
    },
    {
      id: 4,
      name: "Emily Davis",
      phone: "555-3456",
      totalInstallments: 8,
      paidInstallments: 6,
      pendingInstallments: 2,
      pendingAmount: 150.0,
    },
    {
      id: 5,
      name: "David Wilson",
      phone: "555-7890",
      totalInstallments: 14,
      paidInstallments: 10,
      pendingInstallments: 4,
      pendingAmount: 600.0,
    },
  ]);
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, customers]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddCustomer = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmitCustomer = (newCustomer: any) => {
    setCustomers([...customers, newCustomer]);
    setIsModalOpen(false);
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button onClick={handleAddCustomer}>Adicionar Cliente</Button>
      </div>
      <div className="mb-6">
        <Input
          placeholder="Pesquisar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Total de Parcelas</TableHead>
              <TableHead>Parcelas Pagas</TableHead>
              <TableHead>Parcelas Pendentes</TableHead>
              <TableHead>Valor Pendente</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.totalInstallments}</TableCell>
                <TableCell>{customer.paidInstallments}</TableCell>
                <TableCell>{customer.pendingInstallments}</TableCell>
                <TableCell>R$ {customer.pendingAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newCustomer = {
                id: customers.length + 1,
                name: formData.get("name"),
                phone: formData.get("phone"),
                totalInstallments: 0,
                paidInstallments: 0,
                pendingInstallments: 0,
                pendingAmount: 0,
              };
              handleSubmitCustomer(newCustomer);
            }}
            className="space-y-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" name="phone" required />
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
              <div>
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancelar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
