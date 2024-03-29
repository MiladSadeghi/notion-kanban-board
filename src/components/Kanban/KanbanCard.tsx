import { DropIndicator } from '@components';
import { DragEvent } from 'react';
import { motion } from 'framer-motion';
import { useDragStore } from '@stores';

type Props = IKanbanInfo & {
  handleDragStart: (
    event: DragEvent<HTMLDivElement>,
    card: IKanbanInfo,
  ) => void;
};

function KanbanCard({ id, title, column, bgColor, handleDragStart }: Props) {
  const { setIsDragging } = useDragStore();
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable={true}
        onDragEnd={() => setIsDragging(false)}
        onDragStart={(event) =>
          handleDragStart(event as unknown as DragEvent<HTMLDivElement>, {
            id,
            title,
            column,
            bgColor,
          })
        }
        style={{
          backgroundColor: `rgba(${bgColor}, 1)`,
        }}
        className={`relative cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing hover:opacity-100 translate-x-0 translate-y-0 z-0`}
        children={<p className="text-sm text-neutral-100">{title}</p>}
      />
    </>
  );
}

export default KanbanCard;
