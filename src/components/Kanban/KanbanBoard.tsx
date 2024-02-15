import { KanbanColumn } from '@components';
import Cards from '@shared/Cards';
import { useState } from 'react';

// Board component will house all of actual functionality and everything
function KanbanBoard() {
  const [cards] = useState<IKanbanInfo[]>(Cards);

  return (
    <div className="grid w-full h-full grid-cols-4 p-12 gap-14">
      <KanbanColumn
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
      />
      <KanbanColumn
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
      />
      <KanbanColumn
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
      />
      <KanbanColumn
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
      />
    </div>
  );
}

export default KanbanBoard;
