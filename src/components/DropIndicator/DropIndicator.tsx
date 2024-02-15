type Props = {
  beforeId: string;
  column: 'backlog' | 'todo' | 'doing' | 'done';
};

// DropIndicator is just indicator and will place in between cards
function DropIndicator({ beforeId, column }: Props) {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
}

export default DropIndicator;
