import { DropIndicator } from '@components';
import { PointerEvent } from 'react';
import { motion } from 'framer-motion';

type Props = IKanbanInfo & {
  handleDragStart: (
    event: PointerEvent<HTMLDivElement>,
    column: 'backlog' | 'todo' | 'doing' | 'done' | null,
    cardId: string,
    index: number,
  ) => void;
  index: number;
};

function KanbanCard({
  id,
  title,
  column,
  bgColor,
  handleDragStart,
  index,
}: Props) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        onPointerDownCapture={(e) => handleDragStart(e, column, id, index)}
        className={`cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing hover:opacity-100 translate-x-0 translate-y-0 z-0 ${bgColor}`}
        children={<p className="text-sm text-neutral-100">{title}</p>}
      />
    </>
  );
}

export default KanbanCard;
