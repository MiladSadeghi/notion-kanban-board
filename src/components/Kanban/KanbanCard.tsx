import { DropIndicator } from '@components';
import { DragEvent } from 'react';

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
      <div
        draggable={true}
        onDragStart={(event) =>
          handleDragStart(event, { id, title, column, bgColor })
        }
        className={`cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing ${bgColor}`}
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
}

export default KanbanCard;
