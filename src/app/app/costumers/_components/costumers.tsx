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
import { FaRegTrashAlt } from "react-icons/fa";
import { maskPhoneNumber, removeMaskPhoneNumber } from "@/utils/utils";

interface clientCreater {
  userId: string;
  name: string;
  phone: string;
}

export default function Costumers({
  clients,
  user,
  createClient,
  deleteClient,
}: any) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState(clients);
  const [newClient, setNewClient] = useState<clientCreater>({
    userId: "",
    name: "",
    phone: "",
  });
  const [clientToDelete, setClientToDelete] = useState<any>({
    name: "",
    id: -1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer: any) =>
      customer?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, customers]);

  const handleAddCustomer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteCustomer = () => {
    deleteClient(clientToDelete.id);
    router.refresh();
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
        {filteredCustomers.length === 0 ? (
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            Não foi encontrado clientes
          </div>
        ) : (
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
                  <TableCell>{maskPhoneNumber(customer.phone)}</TableCell>
                  <TableCell>{customer.totalInstallments}</TableCell>
                  <TableCell>{customer.paidInstallments}</TableCell>
                  <TableCell>{customer.pendingInstallments}</TableCell>
                  <TableCell>R$ {customer.pendingAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => {
                        setClientToDelete({
                          id: customer.id,
                          name: customer.name,
                        });
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <FaRegTrashAlt size={20} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                required
                minLength={15}
                maxLength={15}
                onChange={(e) => {
                  e.target.value = maskPhoneNumber(e.target.value);
                  let newClientInstance = newClient;
                  newClientInstance.phone = removeMaskPhoneNumber(
                    e.target.value
                  );
                  setNewClient(newClientInstance);
                }}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={(e) => {
                  if (!newClient.name) return;
                  if (!newClient.phone) return;
                  setNewClient({ ...newClient, userId: user.id });
                  createClient(newClient);
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
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogTrigger asChild />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Você tem certeza que deseja excluir o cliente{" "}
              <strong>{clientToDelete.name}</strong>?
            </p>
            <p>Isso apagará também todas as cobranças desse cliente</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmDeleteCustomer}>Excluir</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
