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
  const { setIsDragging } = useDragStore();

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
    setTimeout(() => {
      setActive(false);
    }, 130);
    setIsDragging(false);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`absolute grid w-full h-36 bottom-0 text-3xl  pt-10 justify-center transition-all duration-200 overflow-hidden ${active ? 'bg-gradient-to-b from-transparent  to-red-800/60 text-neutral-300' : 'bg-gradient-to-b from-transparent to-neutral-500/40 text-neutral-300'}`}
    >
      {active ? (
        <FaFire size={80} className="mt-1" />
      ) : (
        <FiTrash size={80} className="mt-1" />
      )}
    </div>
  );
}

export default KanbanRemove;
