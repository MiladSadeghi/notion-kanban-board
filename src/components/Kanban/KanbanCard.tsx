import { DropIndicator } from '@components';
import { DragEvent } from 'react';
import { motion } from 'framer-motion';

type Props = IKanbanInfo & {
  handleDragStart: (
    event: DragEvent<HTMLDivElement>,
    card: IKanbanInfo,
  ) => void;
};

function KanbanCard({ id, title, column, bgColor, handleDragStart }: Props) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable={true}
        onDragStart={(event) =>
          handleDragStart(event as unknown as DragEvent<HTMLDivElement>, {
            id,
            title,
            column,
            bgColor,
          })
        }
        className={`cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing ${bgColor}`}
        children={<p className="text-sm text-neutral-100">{title}</p>}
      />
    </>
  );
}

export default KanbanCard;
