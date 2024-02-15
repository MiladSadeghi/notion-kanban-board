import { DropIndicator, KanbanCard } from '@components';
import { useState } from 'react';

type Props = {
  title: 'Backlog' | 'TODO' | 'In progress' | 'Complete';
  column: 'backlog' | 'todo' | 'doing' | 'done';
  headingColor: string;
  cards: IKanbanInfo[];
};

// KanbanColumn component it shows each column in the board
const KanbanColumn = ({ title, headingColor, column, cards }: Props) => {
  // When hovering over a card in each column, set 'active' to true and change the column's background color.
  const [active] = useState(false);

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
        className={`h-full w-full transition-colors p-3 rounded-md ${active ? 'bg-neutral-800/50' : 'bg-[#262626]'}`}
      >
        {filteredCards.map((card) => (
          <KanbanCard key={card.id} {...card} />
        ))}
        <DropIndicator beforeId="-1" column={column} />
      </div>
    </div>
  );
};

export default KanbanColumn;