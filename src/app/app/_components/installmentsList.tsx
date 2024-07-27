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
}: {
  installments: Array<installment>;
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
      </CardContent>
    </Card>
  );
}
