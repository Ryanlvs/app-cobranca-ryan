import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatDate, formatValue } from "@/utils/utils";
import { FaWhatsapp } from "react-icons/fa";

interface installment {
  clientName: string;
  amount: number;
  dueDate: Date;
  link: string;
}

export default function InstallmentsList({
  installments,
  hasPendingInstallments,
}: {
  installments: Array<installment>;
  hasPendingInstallments: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cobranças da semana</CardTitle>
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
              {installments.map((installment, key) => {
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
                      <a href={installment.link}>
                        <FaWhatsapp size={30} />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Switch />
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
  );
}
