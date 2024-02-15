import { DropIndicator } from '@components';

type Props = IKanbanInfo;

function KanbanCard({ id, title, column, bgColor }: Props) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        draggable={true}
        className={`cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing ${bgColor}`}
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
}

export default KanbanCard;
