interface GameButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

export function GameButton({ onClick, text }: GameButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded text-1xl p-2 text-zinc-800 font-bold hover:underline transition-all"
    >
      {text}
    </button>
  );
}
