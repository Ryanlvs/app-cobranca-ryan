import InstallmentsPage from "./_components/installments";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/services/auth";
import { add3Hours, formatDate, formatValue } from "@/utils/utils";

const today = new Date();
const prisma = new PrismaClient();

export default async function Page() {
  const session = await auth();

  const clients = await prisma.client.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const installments = await prisma.installment.findMany({
    where: {
      client: {
        userId: session?.user?.id,
      },
    },
    include: {
      client: true,
    },
  });

  let hydratedInstallments = installments.map((installment) => {
    return {
      id: installment.id,
      client: installment.client.name,
      dueDate: add3Hours(installment.dueDate),
      value: installment.amount,
      number: installment.number,
      description: installment.description,
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
      status: installment.paid
        ? "Pago"
        : today > installment.dueDate
        ? "Atrasado"
        : "Pendente",
    };
  });

  let createInstallment = async ({
    clientId,
    amount,
    dueDate,
    recurrence,
    description,
    installmentsNumber,
  }: any) => {
    "use server";

    let days = 0;

    if (recurrence === "weekly") days = 7;
    if (recurrence === "biweekly") days = 14;

    let newDueDate = new Date(dueDate);

    for (let i = 1; i <= installmentsNumber; i++) {
      if (i !== 1 && (recurrence === "weekly" || recurrence === "biweekly"))
        newDueDate = addDays(newDueDate, days);

      if (i !== 1 && recurrence === "monthly")
        newDueDate = addMonths(newDueDate, 1);

      await prisma.installment.create({
        data: {
          clientId: clientId,
          amount: amount / installmentsNumber,
          number: i + "/" + installmentsNumber,
          description: description,
          dueDate: newDueDate,
        },
      });
    }
  };

  let editInstallment = async (installment: any) => {
    "use server";

    let data: any = {
      amount: installment.amount,
      paid: installment.paid,
      dueDate: installment.dueDate,
      description: installment.description,
    };

    if (!installment.paid) data.payDate = null;

    await prisma.installment.update({
      data: data,
      where: {
        id: installment.id,
      },
    });
  };

  let deleteInstallment = async (id: number) => {
    "use server";
    await prisma.installment.deleteMany({
      where: {
        id: id,
      },
    });
  };

  return (
    <InstallmentsPage
      clients={clients}
      installments={hydratedInstallments}
      createInstallment={createInstallment}
      editInstallment={editInstallment}
      deleteInstallment={deleteInstallment}
    />
  );
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}
