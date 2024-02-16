import { create } from 'zustand';

const useDragStore = create<IDragStore>()((set) => ({
  isDragging: false,
  cardColumn: null,
  draggedID: null,
  setIsDragging: (isDragging, cardColumn = null, draggedID = null) =>
    set({ isDragging, cardColumn, draggedID }),
}));

export default useDragStore;
