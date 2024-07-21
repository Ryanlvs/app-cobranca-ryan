/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Cob0gOzAFHl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { User } from "@prisma/client";

import IndicatorsBoxs from "./indicatorsBoxs";
import InstallmentsList from "./installmentsList";
import { getURL } from "next/dist/shared/lib/utils";

interface installment {
  clientName: String;
  amount: String;
  count: String;
}

const installments = [
  {
    clientName: "Lucas",
    amount: "349,56",
    link: "https://api.whatsapp.com/send?phone=5531987444360&text=Ola",
    status: false,
  },
  {
    clientName: "Arthur",
    amount: "250,00",
    link: "https://api.whatsapp.com/send?phone=5531987444360&text=Ola",
    status: false,
  },
  {
    clientName: "Pedro",
    amount: "100,00",
    link: "https://api.whatsapp.com/send?phone=5531987444360&text=Ola",
    status: false,
  },
  {
    clientName: "João",
    amount: "530,40",
    link: "https://api.whatsapp.com/send?phone=5531987444360&text=Ola",
    status: false,
  },
  {
    clientName: "Sandro",
    amount: "760,14",
    link: "https://api.whatsapp.com/send?phone=5531987444360&text=Ola",
    status: false,
  },
];

export default function Dashboard({ user }: { user: User }) {
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      {/* <div className="mb-4 text-lg font-medium">Olá, {user.name}!</div> */}
      <IndicatorsBoxs />
      <div className="mt-8 grid gap-4 md:gap-6">
        <InstallmentsList installments={installments} />
      </div>
    </div>
  );
}
