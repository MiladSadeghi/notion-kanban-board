interface IKanbanInfo {
  id: string;
  title: string;
  column: 'backlog' | 'todo' | 'doing' | 'done';
  bgColor: string;
}

type TSetState<T> = Dispatch<SetStateAction<T>>;

interface IDragStore {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}
