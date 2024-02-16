import { DragEvent, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { useDragStore } from '@stores';

type Props = {
  setCards: TSetState<IKanbanInfo[]>;
};

// KanbanRemove is a component where users can grab a Kanban card and drop it to remove it.
function KanbanRemove({ setCards }: Props) {
  const [active, setActive] = useState(false);
  const { isDragging, setIsDragging } = useDragStore();

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setActive(true);
  }

  function handleDragLeave() {
    setActive(false);
  }

  function handleDragEnd(event: DragEvent<HTMLDivElement>) {
    const cardId = event.dataTransfer.getData('cardId');

    setCards((prevCards: IKanbanInfo[]) =>
      prevCards.filter((card) => card.id !== cardId),
    );
    setActive(false);
    setIsDragging(false);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`absolute bottom-[25px] right-[25px] grid w-56 h-56 text-3xl border rounded place-content-center transition-opacity ${active ? 'border-red-800 bg-red-800/20 text-red' : 'border-neutral-500 bg-neutral-500/40 text-neutral-500'} ${isDragging ? 'opacity-100' : 'opacity-0'}`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
}

export default KanbanRemove;
