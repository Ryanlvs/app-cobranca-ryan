/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BWU0grkJmTW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ResumePage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Resumo Semanal</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CreditCardIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Cobranças</p>
              <p className="text-2xl font-bold">125</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckIcon className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">
                Cobranças Recebidas
              </p>
              <p className="text-2xl font-bold">100</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CircleIcon className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">
                Cobranças Pendentes
              </p>
              <p className="text-2xl font-bold">25</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="text-2xl font-bold">$12,500</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Valor Recebido</p>
              <p className="text-2xl font-bold">$10,000</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Valor Pendente</p>
              <p className="text-2xl font-bold">$2,500</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Resumo Mensal</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CreditCardIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Cobranças</p>
              <p className="text-2xl font-bold">500</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckIcon className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">
                Cobranças Recebidas
              </p>
              <p className="text-2xl font-bold">450</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CircleIcon className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">
                Cobranças Pendentes
              </p>
              <p className="text-2xl font-bold">50</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="text-2xl font-bold">$50,000</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Valor Recebido</p>
              <p className="text-2xl font-bold">$45,000</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CurrencyIcon className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Valor Pendente</p>
              <p className="text-2xl font-bold">$5,000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CircleCheckIcon(props) {
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

function CircleIcon(props) {
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

function CreditCardIcon(props) {
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

function CurrencyIcon(props) {
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

function XIcon(props) {
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
