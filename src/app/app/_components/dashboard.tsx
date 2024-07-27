/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Cob0gOzAFHl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { PrismaClient, User } from "@prisma/client";

import IndicatorsBoxs from "./indicatorsBoxs";
import InstallmentsList from "./installmentsList";
import { getURL } from "next/dist/shared/lib/utils";
import { auth } from "@/services/auth";
import { link } from "fs";

interface installment {
  clientName: String;
  amount: String;
  count: String;
}

const session = await auth();
const prisma = new PrismaClient();

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0); // Zerar horas, minutos, segundos e milissegundos

const installments = await prisma.installment.findMany({
  where: {
    client: {
      userId: session?.user?.id,
    },
    dueDate: {
      lt: tomorrow,
    },
    paid: false,
  },
  include: {
    client: true,
  },
});

const futureInstallments = await prisma.installment.findMany({
  where: {
    client: {
      userId: session?.user?.id,
    },
    dueDate: {
      gt: tomorrow,
    },
    paid: false,
  },
});

const hydratedInstallments = installments.map((installment) => {
  return {
    clientName: installment.client.name,
    amount: installment.amount,
    dueDate: installment.dueDate,
    link:
      "https://api.whatsapp.com/send?phone=55" +
      installment.client.phone +
      "&text=Ola",
  };
});

export default function Dashboard({ user }: { user: User }) {
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="mb-4 text-lg font-medium">Olá, {user.name}!</div>
      <IndicatorsBoxs
        installmentsNumber={installments.length}
        installmentsAmount={installments.reduce((acc, e) => {
          return acc + e.amount;
        }, 0)}
        futureInstallmentsNumber={futureInstallments.length}
        futureInstallmentsAmount={futureInstallments.reduce((acc, e) => {
          return acc + e.amount;
        }, 0)}
      />
      <div className="mt-8 grid gap-4 md:gap-6">
        <InstallmentsList installments={hydratedInstallments} />
      </div>
    </div>
  );
}
