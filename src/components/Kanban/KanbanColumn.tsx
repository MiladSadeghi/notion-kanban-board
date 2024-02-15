import { DropIndicator, KanbanAddCard, KanbanCard } from '@components';
import { DragEvent, useState } from 'react';

type Props = {
  title: 'Backlog' | 'TODO' | 'In progress' | 'Complete';
  column: 'backlog' | 'todo' | 'doing' | 'done';
  headingColor: string;
  cards: IKanbanInfo[];
  setCards: TSetState<IKanbanInfo[]>;
};

// KanbanColumn component it shows each column in the board
const KanbanColumn = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: Props) => {
  // When hovering over a card in each column, set 'active' to true and change the column's background color.
  const [active, setActive] = useState(false);

  // handle card when start dragging
  function handleDragStart(
    event: DragEvent<HTMLDivElement>,
    card: IKanbanInfo,
  ) {
    event?.dataTransfer?.setData('cardId', card.id);
  }

  // column background will change when a card is dragged onto it
  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setActive(true);
  }

  // column background returns to normal when a card is dragged out
  function handleDragLeave() {
    setActive(false);
  }

  // column background returns to normal when a card is dropped on it
  function handleDragEnd() {
    setActive(false);
  }

  // Filter card props: Each column gets its own set of individual cards.
  const filteredCards = cards.filter((card) => card.column === column);
  return (
    <div className="flex flex-col shrink-0">
      <div className="flex items-center justify-between mb-3 ">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="text-sm rounded text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors p-3 rounded-md ${active ? 'bg-black' : 'bg-[#262626]'}`}
      >
        {filteredCards.map((card) => (
          <KanbanCard
            key={card.id}
            handleDragStart={handleDragStart}
            {...card}
          />
        ))}
        <DropIndicator beforeId="-1" column={column} />
        <KanbanAddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default KanbanColumn;
