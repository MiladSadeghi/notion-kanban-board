import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

// KanbanRemove is a component where users can grab a Kanban card and drop it to remove it.
function KanbanRemove() {
  const [active] = useState(false);
  return (
    <div
      className={`absolute bottom-[25px] right-[25px] grid w-56 h-56 text-3xl border rounded place-content-center ${active ? 'border-red-800 bg-red-800/20 text-red' : 'border-neutral-500 bg-neutral-500/40 text-neutral-500'}`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
}

export default KanbanRemove;
