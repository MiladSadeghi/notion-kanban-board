import { create } from 'zustand';

const useDragStore = create<IDragStore>()((set) => ({
  isDragging: false,
  cardColumn: null,
  setIsDragging: (isDragging, cardColumn = null) =>
    set({ isDragging, cardColumn }),
}));

export default useDragStore;
