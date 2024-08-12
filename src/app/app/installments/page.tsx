import InstallmentsPage from "./_components/installments";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/services/auth";

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
      value: installment.amount,
      whatsappLink: "https://wa.me/55" + installment.client.phone,
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
          amount: amount,
          dueDate: newDueDate,
        },
      });
    }
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
