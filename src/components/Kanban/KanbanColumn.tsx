import {
  DropIndicator,
  KanbanAddCard,
  KanbanCard,
  KanbanRemove,
} from '@components';
import { PointerEvent as PointerEventGen, useRef, useState } from 'react';
import { useDragStore } from '@stores';

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
  const { isDragging, cardColumn, setIsDragging } = useDragStore();
  const columnRef = useRef<HTMLDivElement>(null);

  function detectLeftButton(event: PointerEventGen<HTMLDivElement>) {
    return event.buttons === 1;
  }

  // handle card when start dragging
  function handleDragStart(
    event: PointerEventGen<HTMLDivElement>,
    column: 'backlog' | 'todo' | 'doing' | 'done' | null,
    cardId: string,
    index: number,
  ) {
    if (!detectLeftButton(event)) return;
    setIsDragging(true, column, cardId);
    const currentColumn = columnRef?.current;
    const items: HTMLElement[] = Array.from(
      currentColumn?.childNodes || [],
    ).filter((childNode): childNode is HTMLElement => {
      if (childNode instanceof HTMLElement) {
        return (
          !childNode.getAttribute('data-before') &&
          childNode.tagName !== 'BUTTON'
        );
      }
      return false;
    });

    const dragItem = items[index];
    const itemsBellowDraggedItems = items.slice(index + 1);

    // getBoundingClientReact of dragItem
    const dragBoundingRect = dragItem.getBoundingClientRect();

    // set style for dragItem when mouse down
    dragItem.style.position = 'fixed';
    dragItem.style.zIndex = '10';
    dragItem.style.width = `${dragBoundingRect.width}px`;
    dragItem.style.height = `${dragBoundingRect.height}px`;
    dragItem.style.top = `${dragBoundingRect.top}px`;
    dragItem.style.left = `${dragBoundingRect.left}px`;

    // create alternative div element when dragItem position is fixed
    const div = document.createElement('div');
    div.id = 'div-temp';
    div.style.width = `${dragBoundingRect.width}px`;
    div.style.height = `${dragBoundingRect.height}px`;
    div.style.pointerEvents = 'none';
    currentColumn?.appendChild(div);

    // move the elements below dragItem.
    // distance to be moved.
    // 2 is the margin of top and bottom in highlight indicator
    const distance = dragBoundingRect.height + 2;

    itemsBellowDraggedItems.forEach(
      (item) => (item.style.transform = `translateY(${distance}px)`),
    );

    // get the original coordinates of the mouse pointer
    const x = event.clientX;
    const y = event.clientY;

    document.onpointermove = dragMove;

    function dragMove(ev: PointerEvent) {
      // Calculate the distance the mouse pointer has traveled.
      // original coordinates minus current coordinates.
      const posX = ev.clientX - x;
      const posY = ev.clientY - y;
      highlightIndicator(ev);
      setActive(true);

      // swap position

      itemsBellowDraggedItems.forEach((item) => (item.style.transform = ``));

      // get indicators of dropped column

      // Move Item
      dragItem.style.transform = `translate(${posX}px, ${posY}px)`;
      // const notDragItems = items.filter((_, i) => i !== index);
      // // Swap position and data
      // notDragItems.forEach((item) => {
      //   //   // check two elements is overlapping
      //   const rect1 = dragItem.getBoundingClientRect();
      //   const rect2 = item.getBoundingClientRect();

      //   const isOverLapping =
      //     rect1.y < rect2.y + rect2.height / 2 &&
      //     rect1.y + rect1.height / 2 > rect2.y;

      //   if (isOverLapping) {
      //     if (item.getAttribute('style')) {
      //       item.style.transform = '';
      //       index++;
      //     } else {
      //       item.style.transform = `translateY(${distance}px)`;
      //       index--;
      //     }
      //   }
      // });
    }

    document.onpointerup = dragEnd;
    function dragEnd() {
      setActive(false);
      clearHighlights();
      setIsDragging(false);
      document.onpointerup = null;
      document.onpointermove = null;
      dragItem.style.position = '';
      dragItem.style.zIndex = '';
      dragItem.style.width = '';
      dragItem.style.height = '';
      dragItem.style.top = '';
      dragItem.style.left = '';
      dragItem.style.transform = '';
      currentColumn?.removeChild(div);

      // swap position

      itemsBellowDraggedItems.forEach((item) => (item.style.transform = ``));

      // get indicators of dropped column
      const indicators = getIndicators() as HTMLElement[];

      // get nearest indicator of dragged card on current column
      const { element } = getNearestIndicator(event, indicators);

      // this is (we set before for every highlight) linked to whatever
      // card is nearest to where we were hovering
      // if we don't have one, by default we use -1
      // -1 is indicate the very end of the list
      const before = element.dataset.before || '-1';
      console.log(cardId, before);

      // if before is equal to whatever the card ID that means you are trying
      // put it in front of itself
      if (before === cardId && column) {
        let newCards = [...cards];

        // get card by the card id
        let cardToTransfer = newCards.find((card) => card.id === cardId);
        if (!cardToTransfer) return;

        // update card column. maybe we drag the card to new column
        cardToTransfer = { ...cardToTransfer, column: column };

        // kick out the card from the old column
        newCards = newCards.filter((card) => card.id !== cardId);

        const moveToBack = before === '-1';

        // if its same column
        if (moveToBack) {
          newCards.push(cardToTransfer);
        } else {
          const insertAtIndex = newCards.findIndex(
            (card) => card.id === before,
          );
          if (insertAtIndex === undefined) return;

          newCards.splice(insertAtIndex, 0, cardToTransfer);
        }

        setCards(newCards);
      }
    }
  }

  // column background will change when a card is dragged onto it

  // column background returns to normal when a card is dragged out
  function handleDragLeave() {
    setActive(false);
    clearHighlights();
  }

  // highlight indicator of cards
  function highlightIndicator(event: PointerEvent) {
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
    event: PointerEvent | PointerEventGen<HTMLDivElement>,
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

  // Filter card props: Each column gets its own set of individual cards
  const filteredCards = cards.filter((card) => card.column === column);
  return (
    <div className="relative flex flex-col shrink-0">
      <div className="flex items-center justify-between mb-3 ">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="text-sm rounded text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        ref={columnRef}
        onPointerOver={handleDragLeave}
        onPointerLeave={handleDragLeave}
        // onPointerEnter={handleDragOver}
        className={`touch-none h-full w-full transition-colors p-3 rounded-md ${active ? 'bg-[#1d1d1d]' : 'bg-[#262626]'}`}
      >
        {filteredCards.map((card, idx) => (
          <KanbanCard
            key={card.id}
            index={idx}
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
