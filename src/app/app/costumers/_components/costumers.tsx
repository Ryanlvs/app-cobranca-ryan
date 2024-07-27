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
import { useRouter } from "next/navigation";

export default function Costumers({ createClient, clients }: any) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState(clients);
  const [newClient, setNewClient] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer: any) =>
      customer.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, customers]);

  const handleAddCustomer = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
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
            {filteredCustomers.map((customer: any) => (
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
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                required
                onChange={(e) => {
                  let newClientInstance = newClient;
                  newClientInstance.name = e.target.value;
                  setNewClient(newClientInstance);
                  console.log(newClient);
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                required
                onChange={(e) => {
                  let newClientInstance = newClient;
                  newClientInstance.phone = e.target.value;
                  setNewClient(newClientInstance);
                  console.log(newClient);
                }}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  if (!newClient.name) return;
                  if (!newClient.phone) return;
                  console.log(newClient);
                  createClient(newClient);
                  router.refresh();
                }}
              >
                Salvar
              </Button>
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
