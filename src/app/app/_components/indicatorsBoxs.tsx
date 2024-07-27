"use client";

import { MdOutlineReceiptLong } from "react-icons/md";
import { FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { formatValue } from "@/utils/utils";

const ICONS_SIZE = 25;

export default function IndicatorsBoxs({
  installmentsNumber,
  installmentsAmount,
  futureInstallmentsNumber,
  futureInstallmentsAmount,
}: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <div className="bg-card rounded-lg p-4 flex flex-col gap-2 border-solid border-2 border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-card-foreground">
            Número de cobranças vencidas
          </div>
          <MdOutlineReceiptLong size={ICONS_SIZE} />
        </div>
        <div className="text-2xl font-bold">{installmentsNumber}</div>
      </div>
      <div className="bg-card rounded-lg p-4 flex flex-col gap-2 border-solid border-2 border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-card-foreground">
            Valor total vencido
          </div>
          <FaDollarSign size={ICONS_SIZE} />
        </div>
        <div className="text-2xl font-bold">
          {formatValue(installmentsAmount)}
        </div>
      </div>
      <div className="bg-card rounded-lg p-4 flex flex-col gap-2 border-solid border-2 border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-card-foreground">
            Cobranças futuras
          </div>
          <FaCalendarAlt size={ICONS_SIZE} />
        </div>
        <div className="text-2xl font-bold">{futureInstallmentsNumber}</div>
      </div>
      <div className="bg-card rounded-lg p-4 flex flex-col gap-2 border-solid border-2 border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-card-foreground">
            Valor das cobranças futuras
          </div>
          <FaCalendarAlt size={ICONS_SIZE} />
        </div>
        <div className="text-2xl font-bold">
          {formatValue(futureInstallmentsAmount)}
        </div>
      </div>
    </div>
  );
}
