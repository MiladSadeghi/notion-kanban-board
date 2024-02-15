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
    highlightIndicator(event);
    setActive(true);
  }

  // column background returns to normal when a card is dragged out
  function handleDragLeave() {
    setActive(false);
    clearHighlights();
  }

  // column background returns to normal when a card is dropped on it
  function handleDragEnd() {
    setActive(false);
    clearHighlights();
  }

  // highlight indicator of cards
  function highlightIndicator(event: DragEvent<HTMLDivElement>) {
    const indicators = getIndicators() as HTMLElement[];
    clearHighlights(indicators);
    const el = getNearestIndicator(event, indicators);
    el.element.style.opacity = '1';
  }

  // get indicators from current column and turn them to array
  function getIndicators() {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  }

  // get the nearest indicator of column
  function getNearestIndicator(
    event: DragEvent<HTMLDivElement>,
    indicators: HTMLElement[],
  ) {
    const DISTANCE_OFFSET = 50;

    // reduce indicators to the find the closest
    const el = indicators.reduce(
      (closest, child) => {
        // getting the position of the indicator on page
        const box = child.getBoundingClientRect();

        // calculate the offset between the mouse and wherever that top is
        // we don't really have any buffer at very top of our column
        // so we can hover anywhere about that
        // so for fix that, we added a little bit of offset
        const offset = event.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  }

  function clearHighlights(elements?: HTMLElement[]) {
    const indicators = (elements || getIndicators()) as HTMLElement[];

    for (const indicator of indicators) {
      indicator.style.opacity = '0';
    }
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
