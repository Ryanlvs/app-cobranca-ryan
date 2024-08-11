import Dashboard from "./_components/dashboard";
import { PrismaClient } from "@prisma/client";
import { auth, signOut } from "@/services/auth";
import { NextResponse } from "next/server";
import { getUrl } from "@/lib/get-url";
import { formatDate, formatValue } from "@/utils/utils";

const prisma = new PrismaClient();

export default async function Page() {
  const session = await auth();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

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
      id: installment.id,
      clientName: installment.client.name,
      amount: installment.amount,
      dueDate: installment.dueDate,
      link:
        "https://api.whatsapp.com/send?phone=55" +
        installment.client.phone +
        "&text=" +
        "Olá " +
        installment.client.name +
        ", a parcela do dia " +
        formatDate(installment.dueDate) +
        " no valor de " +
        formatValue(installment.amount) +
        " venceu!",
    };
  });

  const confirmPayment = async (id: number) => {
    "use server";
    let updateInstallment = await prisma.installment.findUnique({
      where: {
        id: id,
      },
    });

    if (updateInstallment) {
      updateInstallment.paid = true;
      updateInstallment.payDate = new Date();

      await prisma.installment.update({
        where: {
          id: id,
        },
        data: updateInstallment,
      });
    }

    return NextResponse.redirect(new URL(getUrl("/app")));
  };

  return (
    <Dashboard
      user={session?.user}
      installments={installments}
      futureInstallments={futureInstallments}
      hydratedInstallments={hydratedInstallments}
      confirmPayment={confirmPayment}
    />
  );
}
