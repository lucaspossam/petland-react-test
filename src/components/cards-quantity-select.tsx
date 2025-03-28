import { Minus, Plus } from "lucide-react";

interface CardsQuantitySelectProps {
  pairs: number;
  setPairs: (number: number | ((prev: number) => number)) => void;
}

export function CardsQuantitySelect({
  pairs,
  setPairs,
}: CardsQuantitySelectProps) {
  const increment = (): void => setPairs(prev => Math.min(prev + 1, 16));
  const decrement = (): void => setPairs(prev => Math.max(prev - 1, 2));

  return (
    <div className="w-[900px] flex flex-col items-center justify-center h-fit">
      <div className="flex flex-col items-center space-y-2">
        <label className="text-center font-roboto pb-2">
          Selecione a quantidade de pares para adivinhar :)
        </label>
        <div className="flex items-center border rounded-md w-fit px-3 py-1">
          <button
            onClick={decrement}
            className="p-1 text-gray-600 hover:text-black hover:cursor-pointer"
            disabled={pairs <= 2}
          >
            <Minus size={20} />
          </button>
          <input
            type="text"
            disabled
            value={pairs}
            onChange={e => setPairs(Number(e.target.value))}
            className="w-12 text-center border-none focus:outline-none"
            min={2}
            max={16}
          />
          <button
            onClick={increment}
            className="p-1 text-gray-600 hover:text-black hover:cursor-pointer"
            disabled={pairs >= 16}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
