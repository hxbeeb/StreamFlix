import {create} from 'zustand';

export interface InfoModalStore {
    movieId: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

const useInfoModal = create<InfoModalStore>((set) => ({
    movieId: '',
    isOpen: false,
    openModal: (movieId: string) => set({ movieId, isOpen: true }),
    closeModal: () => set({ movieId: undefined, isOpen: false }),
}));

export default useInfoModal;

