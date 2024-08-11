/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BWU0grkJmTW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import ResumeCard from "./ResumeCard";

interface data {
  createdAmount: number;
  paidAmount: number;
  createdValue: number;
  paidValue: number;
  pendingAmount: number;
  pendingValue: number;
}

export default async function ResumePage({
  weekData,
  monthData,
  totalData,
}: {
  weekData: data;
  monthData: data;
  totalData: data;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 gap-5 flex flex-col">
      <ResumeCard title={"Resumo Semanal"} data={weekData} />
      <ResumeCard title={"Resumo Mensal"} data={monthData} />
      <ResumeCard title={"Resumo Total"} data={totalData} />
    </div>
  );
}
