import {
  DropIndicator,
  KanbanAddCard,
  KanbanCard,
  KanbanRemove,
} from '@components';
import { ChangeEvent, DragEvent, KeyboardEvent, useState } from 'react';
import { useDragStore } from '@stores';

type Props = {
  title: string;
  column: string;
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
  const { isDragging, cardColumn, setIsDragging } = useDragStore();
  const [isColumnTitleClicked, setIsColumnTitleClicked] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  // Filter card props: Each column gets its own set of individual cards
  const filteredCards = cards.filter((card) => card.column === column);

  // handle card when start dragging
  function handleDragStart(
    event: DragEvent<HTMLDivElement>,
    card: IKanbanInfo,
  ) {
    event?.dataTransfer?.setData('cardId', card.id);
    setIsDragging(true, column);
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
  function handleDragEnd(event: DragEvent<HTMLDivElement>) {
    setActive(false);
    clearHighlights();
    setIsDragging(false);

    // get card id from dropped card
    const cardId = event.dataTransfer.getData('cardId');

    // get indicators of dropped column
    const indicators = getIndicators() as HTMLElement[];

    // get nearest indicator of dragged card on current column
    const { element } = getNearestIndicator(event, indicators);

    // this is (we set before for every highlight) linked to whatever
    // card is nearest to where we were hovering
    // if we don't have one, by default we use -1
    // -1 is indicate the very end of the list
    const before = element.dataset.before || '-1';

    // if before is equal to whatever the card ID that means you are trying
    // put it in front of itself
    if (before !== cardId) {
      let newCards = [...cards];

      // get card by the card id
      let cardToTransfer = newCards.find((card) => card.id === cardId);
      if (!cardToTransfer) return;

      // update card column. maybe we drag the card to new column
      cardToTransfer = { ...cardToTransfer, column };

      // kick out the card from the old column
      newCards = newCards.filter((card) => card.id !== cardId);

      const moveToBack = before === '-1';

      // if its same column
      if (moveToBack) {
        newCards.push(cardToTransfer);
      } else {
        const insertAtIndex = newCards.findIndex((card) => card.id === before);
        if (insertAtIndex === undefined) return;

        newCards.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(newCards);
    }
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

  function handleColumnTitleInput(e: ChangeEvent<HTMLInputElement>) {
    setColumnTitle(e.target.value);
  }

  function HandleEnterKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setIsColumnTitleClicked(false);
      return;
    }
  }

  return (
    <div className="relative flex flex-col shrink-0">
      <div className="flex items-center justify-between mb-3 ">
        {isColumnTitleClicked ? (
          <input
            value={columnTitle}
            autoFocus
            className={`${headingColor} font-medium bg-black outline-none`}
            onChange={(e) => handleColumnTitleInput(e)}
            onKeyDown={HandleEnterKey}
          />
        ) : (
          <h3
            onClick={() => setIsColumnTitleClicked(true)}
            className={`font-medium ${headingColor}`}
          >
            {columnTitle}
          </h3>
        )}
        <span className="text-sm rounded text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors p-3 rounded-md ${active ? 'bg-[#1d1d1d]' : 'bg-[#262626]'}`}
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
      {isDragging && cardColumn === column && (
        <KanbanRemove setCards={setCards} />
      )}
    </div>
  );
};

export default KanbanColumn;
