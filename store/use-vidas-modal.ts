import {create} from "zustand";

type VidasModalState = {
    isOpen: boolean; 
    open: () => void;
    close: () => void;
};

export const useVidasModal = create<VidasModalState>((set) =>({
    isOpen:false,
    open:() => set({isOpen:true}),
    close: () => set({isOpen:false}),
}));

