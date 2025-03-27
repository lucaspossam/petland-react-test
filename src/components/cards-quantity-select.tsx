interface CardsQuantitySelectProps {
  pairs: number;
  setPairs: (number: number) => void;
}

export function CardsQuantitySelect({
  pairs,
  setPairs,
}: CardsQuantitySelectProps) {
  return (
    <div className="w-[215px] flex flex-col items-center justify-center h-fit">
      <label className="text-center">
        Selecione a quantidade de pares para adivinhar :)
      </label>
      <select
        className="w-full p-2 border rounded-md"
        value={pairs}
        onChange={e => setPairs(Number(e.target.value))}
      >
        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(num => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}
