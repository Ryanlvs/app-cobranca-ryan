import Costumers from "./_components/costumers";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/services/auth";
import { NextResponse } from "next/server";
import { getUrl } from "@/lib/get-url";

const prisma = new PrismaClient();

export default async function Page() {
  const session = await auth();

  const createClient = async (client: any) => {
    "use server";

    await prisma.client.create({
      data: {
        userId: client.userId || session?.user?.id,
        name: client.name,
        phone: client.phone,
      },
    });

    return NextResponse.redirect(new URL(getUrl("/app/costumers")));
  };

  const deleteClient = async (id: number) => {
    "use server";

    await prisma.installment.deleteMany({
      where: {
        clientId: id,
      },
    });

    await prisma.client.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.redirect(new URL(getUrl("/app/costumers")));
  };

  // busca por todos os clientes do usuario
  const clients = await prisma.client.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      installments: true,
    },
  });

  const hydratedCostumers = clients.map((client) => {
    let totalInstallments = client.installments.length || 0;
    let paidInstallments =
      client.installments.filter((installment) => installment?.paid).length ||
      0;
    let pendingInstallments = totalInstallments - paidInstallments;
    let pendingAmount = client.installments.reduce((acc, installment) => {
      if (!installment.paid) {
        return acc + installment.amount;
      }
      return acc;
    }, 0);

    return {
      id: client.id,
      name: client.name,
      phone: client.phone,
      totalInstallments: totalInstallments,
      paidInstallments: paidInstallments,
      pendingInstallments: pendingInstallments,
      pendingAmount: pendingAmount,
    };
  });

  return (
    <Costumers
      clients={hydratedCostumers}
      user={session?.user}
      createClient={createClient}
      deleteClient={deleteClient}
    />
  );
}
