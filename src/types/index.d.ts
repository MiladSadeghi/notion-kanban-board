interface IKanbanInfo {
  id: string;
  title: string;
  column: string;
  bgColor: string;
}

type TSetState<T> = Dispatch<SetStateAction<T>>;

interface IDragStore {
  isDragging: boolean;
  cardColumn: string | null;
  setIsDragging: (isDragging: boolean, cardColumn?: string | null) => void;
}
