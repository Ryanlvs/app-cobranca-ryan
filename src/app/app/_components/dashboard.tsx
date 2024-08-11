/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Cob0gOzAFHl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState } from "react";
import IndicatorsBoxs from "./indicatorsBoxs";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { formatDate, formatValue } from "@/utils/utils";
import { useRouter } from "next/navigation";

export default function Dashboard({
  user,
  installments,
  futureInstallments,
  hydratedInstallments,
  confirmPayment,
}: any) {
  const router = useRouter();

  const hasPendingInstallments = hydratedInstallments.length !== 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [installmentConfirm, setInstallmentConfirm] = useState({
    amount: 0,
    client: "",
    id: 0,
  });

  const handleConfirmPayment = () => {
    confirmPayment(installmentConfirm.id);
    router.refresh();
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="mb-4 text-lg font-medium">Olá, {user.name}!</div>
      <IndicatorsBoxs
        installmentsNumber={installments.length}
        installmentsAmount={installments.reduce((acc: number, e: any) => {
          return acc + e.amount;
        }, 0)}
        futureInstallmentsNumber={futureInstallments.length}
        futureInstallmentsAmount={futureInstallments.reduce(
          (acc: number, e: any) => {
            return acc + e.amount;
          },
          0
        )}
      />
      <div className="mt-8 grid gap-4 md:gap-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>Cobranças da vencidas</CardTitle>
            <CardDescription>
              Uma lista com todas as cobranças que tem o vencimento nessa semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasPendingInstallments ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Dia pagamento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Link WhatsApp</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hydratedInstallments.map((installment: any, key: any) => {
                    return (
                      <TableRow key={key}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div>{installment.clientName}</div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(installment.dueDate)}</TableCell>
                        <TableCell>{formatValue(installment.amount)}</TableCell>
                        <TableCell>
                          <Button>
                            <Link href={installment.link} target="_blank">
                              <FaWhatsapp size={30} target="_blank" />
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => {
                              setInstallmentConfirm({
                                client: installment.clientName,
                                amount: installment.amount,
                                id: installment.id,
                              });
                              setIsModalOpen(true);
                            }}
                          >
                            Pago
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                Não há cobranças pendentes.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen}>
        <DialogTrigger asChild />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Pagamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Você tem certeza que deseja confirmar o pagamento de{" "}
              <strong>{formatValue(installmentConfirm?.amount)}</strong> de{" "}
              <strong>{installmentConfirm.client}</strong>
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleConfirmPayment}>Confirmar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
