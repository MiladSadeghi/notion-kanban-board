import { FormEvent, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

type Props = {
  column: 'backlog' | 'todo' | 'doing' | 'done';
  setCards: TSetState<IKanbanInfo[]>;
};

// With KanbanAddCard, you can make new cards in each column
function KanbanAddCard({ column, setCards }: Props) {
  // task title state
  const [text, setText] = useState('');

  // If the user clicks the 'add' button, this state will become true
  const [adding, setAdding] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!text.trim().length) return;

    const newCard: IKanbanInfo = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
      bgColor: 'bg-[#7678D1]',
    };

    setCards((prevCards: IKanbanInfo[]) => [...prevCards, newCard]);

    setAdding(false);
  }
  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            autoFocus={true}
            placeholder="Add new task..."
            onChange={(e) => setText(e.currentTarget.value)}
            className="w-full p-3 text-sm border rounded border-violet-400 bg-violet-400/20 text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300 font-semibold"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
}

export default KanbanAddCard;
