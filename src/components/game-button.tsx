interface GameButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

export function GameButton({ onClick, text }: GameButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 my-3 bg-primary text-white font-semibold rounded-md hover:bg-orange-700 hover:cursor-pointer disabled:bg-gray-400`}
    >
      {text}
    </button>
  );
}
