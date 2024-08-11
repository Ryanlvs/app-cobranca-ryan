import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatValue } from "@/utils/utils";

export default function ResumeCard({
  title,
  data,
}: {
  title: string;
  data: {
    createdAmount: number;
    paidAmount: number;
    createdValue: number;
    paidValue: number;
    pendingAmount: number;
    pendingValue: number;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-1">
          <div className="flex items-center gap-2">
            <CreditCardIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Cobranças criadas</p>
              <p className="text-lg font-bold">{data.createdAmount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="text-sm font-bold">
                {formatValue(data.createdValue)}
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-1">
          <div className="flex items-center gap-2">
            <CircleIcon className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">
                Cobranças Pendentes
              </p>
              <p className="text-lg font-bold">{data.pendingAmount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Valor Pendente</p>
              <p className="text-sm font-bold">
                {formatValue(data.pendingValue)}
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-1">
          <div className="flex items-center gap-2">
            <CircleCheckIcon className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">
                Cobranças Recebidas
              </p>
              <p className="text-lg font-bold">{data.paidAmount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Valor Recebido</p>
              <p className="text-sm font-bold">{formatValue(data.paidValue)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function CurrencyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <line x1="3" x2="6" y1="3" y2="6" />
      <line x1="21" x2="18" y1="3" y2="6" />
      <line x1="3" x2="6" y1="21" y2="18" />
      <line x1="21" x2="18" y1="21" y2="18" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
