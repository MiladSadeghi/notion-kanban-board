interface IKanbanInfo {
  id: string;
  title: string;
  column: 'backlog' | 'todo' | 'doing' | 'done';
  bgColor: string;
}

type TSetState<T> = Dispatch<SetStateAction<T>>;

interface IDragStore {
  isDragging: boolean;
  cardColumn: 'backlog' | 'todo' | 'doing' | 'done' | null;
  setIsDragging: (
    isDragging: boolean,
    cardColumn?: 'backlog' | 'todo' | 'doing' | 'done' | null,
  ) => void;
}
