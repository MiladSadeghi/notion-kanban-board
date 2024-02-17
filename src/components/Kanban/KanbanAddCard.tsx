import { FormEvent, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

type Props = {
  column: string;
  setCards: TSetState<IKanbanInfo[]>;
};

const colors = [
  '218, 58, 58',
  '201, 74, 168',
  '118, 120, 209',
  '0, 178, 148',
  '63, 136, 228',
  '37, 99, 235',
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
            style={{
              backgroundColor: color
                ? `rgba(${color}, 0.2)`
                : 'rgb(167, 139, 250, 0.2)',
              borderColor: color
                ? `rgba(${color}, 0.6)`
                : 'rgb(167, 139, 250, 0.6)',
            }}
            className={`w-full p-3 text-sm border rounded  text-neutral-50 placeholder-neutral-400 !bg-opacity-20 focus:outline-0 `}
          />
          <div className="mt-1.5 flex justify-between ">
            <div className="flex items-center group">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setColor(color)}
                  style={{ backgroundColor: `rgba(${color}, 1)` }}
                  className={`w-5 h-5 rounded-full border border-slate-500 mr-2 sm:mr-0 sm:-ml-2 first-of-type:ml-0 sm:group-hover:ml-0 transition-all sm:group-hover:mr-2`}
                />
              ))}
            </div>
            <div className="mt-1.5 flex items-center">
              <button
                type="button"
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
