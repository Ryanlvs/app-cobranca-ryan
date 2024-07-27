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

  let createInstallment = async ({ clientId, amount, dueDate }: any) => {
    "use server";
    await prisma.installment.create({
      data: {
        clientId: clientId,
        amount: amount,
        dueDate: dueDate,
      },
    });
  };

  return (
    <InstallmentsPage
      clients={clients}
      installments={hydratedInstallments}
      createInstallment={createInstallment}
    />
  );
}
