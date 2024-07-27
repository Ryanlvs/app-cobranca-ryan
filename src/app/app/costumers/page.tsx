import Costumers from "./_components/costumers";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/services/auth";

const prisma = new PrismaClient();

export default async function Page() {
  const session = await auth();

  let costumersData: Array<any> = [];

  // busca por todos os clientes do usuario
  const clients = await prisma.client.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  // para cada cliente busca as suas parcelas e as classica
  clients.forEach(async (client, index) => {
    let installments = await prisma.installment.findMany({
      where: {
        clientId: client.id,
      },
    });

    let totalInstallments = installments.length || 0;
    let paidInstallments =
      installments.filter((installment) => installment?.paid).length || 0;
    let pendingInstallments = totalInstallments - paidInstallments;
    let pendingAmount = installments.reduce((acc, installment) => {
      if (!installment.paid) {
        return acc + installment.amount;
      }
      return acc;
    }, 0);

    costumersData[index] = {
      id: client.id,
      name: client.name,
      phone: client.phone,
      totalInstallments: totalInstallments,
      paidInstallments: paidInstallments,
      pendingInstallments: pendingInstallments,
      pendingAmount: pendingAmount,
    };
  });

  const createClient = async (client: any) => {
    "use server";
    await prisma.client.create({
      data: {
        userId: session?.user?.id,
        name: client.name,
        phone: client.phone,
      },
    });
  };

  return (
    <Costumers
      createClient={createClient}
      user={session?.user}
      clients={costumersData || []}
    />
  );
}
