import { MdOutlineReceiptLong } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

const ICONS_SIZE = 25;

export default function IndicatorsBoxs() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <div className="bg-card rounded-lg p-4 flex flex-col gap-2 border-solid border-2 border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-card-foreground">
            Número de cobranças da Semana
          </div>
          <MdOutlineReceiptLong size={ICONS_SIZE} />
        </div>
        <div className="text-2xl font-bold">5</div>
      </div>
      <div className="bg-card rounded-lg p-4 flex flex-col gap-2 border-solid border-2 border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-card-foreground">
            Valor total da semana
          </div>
          <FaDollarSign size={ICONS_SIZE} />
        </div>
        <div className="text-2xl font-bold">R$ 1.990,10</div>
      </div>
      <div className="bg-card rounded-lg p-4 flex flex-col gap-2 border-solid border-2 border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-card-foreground">
            Valor a receber
          </div>
          <AiOutlineDollarCircle size={ICONS_SIZE} />
        </div>
        <div className="text-2xl font-bold">R$ 1.990,10</div>
      </div>
      <div className="bg-card rounded-lg p-4 flex flex-col gap-2 border-solid border-2 border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-card-foreground">
            Valor recebido
          </div>
          <RiMoneyDollarBoxLine size={ICONS_SIZE} />
        </div>
        <div className="text-2xl font-bold">R$ 0,00</div>
      </div>
    </div>
  );
}
