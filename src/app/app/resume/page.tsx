import { PrismaClient } from "@prisma/client";
import ResumePage from "./_components/resumePage";
import { auth } from "@/services/auth";
interface data {
  createdAmount: number;
  paidAmount: number;
  createdValue: number;
  paidValue: number;
  pendingAmount: number;
  pendingValue: number;
}

const prisma = new PrismaClient();

export default async function Page() {
  const session = await auth();

  return (
    <ResumePage
      weekData={await getData({
        session: session,
        timeRange: getCurrentWeekRange(),
      })}
      monthData={await getData({
        session: session,
        timeRange: getCurrentMonthRange(),
      })}
      totalData={await getData({ session: session })}
    />
  );
}

async function getData({
  session,
  timeRange,
}: {
  session: any;
  timeRange?: { firstDay: Date | null; lastDay: Date | null };
}) {
  const { firstDay, lastDay } = timeRange || { firstDay: null, lastDay: null };

  let where: any = {
    client: {
      userId: session?.user?.id,
    },
  };

  let createdWhere = { ...where };

  let pendingWhere = { ...where };
  pendingWhere.paid = false;

  let paidWhere = { ...where };
  paidWhere.paid = true;

  if (firstDay && lastDay) {
    createdWhere.createdAt = {
      gte: firstDay,
      lte: lastDay,
    };

    pendingWhere.dueDate = {
      gte: firstDay,
      lte: lastDay,
    };

    paidWhere.payDate = {
      gte: firstDay,
      lte: lastDay,
    };
  }

  const created = await prisma.installment.findMany({
    where: createdWhere,
  });

  const pending = await prisma.installment.findMany({
    where: pendingWhere,
  });

  const paid = await prisma.installment.findMany({
    where: paidWhere,
  });

  return {
    createdAmount: created.length,
    createdValue: created.reduce((acc, e) => acc + e.amount, 0),
    paidAmount: paid.length,
    paidValue: paid.reduce((acc, e) => acc + e.amount, 0),
    pendingAmount: pending.length,
    pendingValue: pending.reduce((acc, e) => acc + e.amount, 0),
  };
}

function getCurrentMonthRange() {
  const today = new Date();

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  lastDayOfMonth.setHours(23, 59, 59, 999);

  return {
    firstDay: firstDayOfMonth,
    lastDay: lastDayOfMonth,
  };
}

function getCurrentWeekRange() {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - dayOfWeek);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  const lastDayOfWeek = new Date(today);
  lastDayOfWeek.setDate(today.getDate() + (6 - dayOfWeek));
  lastDayOfWeek.setHours(23, 59, 59, 999);

  return {
    firstDay: firstDayOfWeek,
    lastDay: lastDayOfWeek,
  };
}
