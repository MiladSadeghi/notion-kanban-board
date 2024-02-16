import { create } from 'zustand';

const useDragStore = create<IDragStore>()((set) => ({
  isDragging: false,
  setIsDragging: (isDragging) => {
    console.log(isDragging);
    set({ isDragging });
  },
}));

export default useDragStore;
