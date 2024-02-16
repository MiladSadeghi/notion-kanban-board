import { FormEvent, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

type Props = {
  column: 'backlog' | 'todo' | 'doing' | 'done';
  setCards: TSetState<IKanbanInfo[]>;
};

const colors = [
  'bg-[#DA3A3A]',
  'bg-[#C94AA8]',
  'bg-[#7678D1]',
  'bg-[#00B294]',
  'bg-[#3F88E4]',
  'bg-blue-600',
];

// With KanbanAddCard, you can make new cards in each column
function KanbanAddCard({ column, setCards }: Props) {
  // task title state
  const [text, setText] = useState('');

  // If the user clicks the 'add' button, this state will become true
  const [adding, setAdding] = useState(false);
  const [color, setColor] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!text.trim().length) return;

    const cardColor = color
      ? color
      : colors[Math.floor(Math.random() * colors.length)];

    const newCard: IKanbanInfo = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
      bgColor: cardColor,
    };

    setCards((prevCards: IKanbanInfo[]) => [...prevCards, newCard]);

    setAdding(false);
  }

  useEffect(() => {
    setText('');
    setColor('');
  }, [adding]);

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
          <div className="mt-1.5 flex justify-between ">
            <div className="flex items-center group">
              {colors.map((color) => (
                <button
                  type="button"
                  onClick={() => setColor(color)}
                  className={`w-5 h-5 rounded-full ${color} border border-slate-500 mr-2 sm:mr-0 sm:-ml-2 first-of-type:ml-0 sm:group-hover:ml-0 transition-all sm:group-hover:mr-2`}
                />
              ))}
            </div>
            <div className="flex items-center justify-end gap-1.5">
              {color && (
                <div
                  className={`border border-slate-500 w-5 h-5 rounded-full ${color}`}
                />
              )}
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
