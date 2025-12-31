import { create } from "zustand";

type GlobalStoreType = {
  is3dOn: boolean;
  resetId: number;
  toggle3D: (isOn?: boolean) => void;
  reset: VoidFunction;
};

export const useGlobalStore = create<GlobalStoreType>((set) => ({
  is3dOn: false,
  resetId: 0,
  toggle3D: (isOn) => set((state) => ({ is3dOn: isOn ?? !state.is3dOn })),
  reset: () => set((state) => ({ resetId: state.resetId + 1 })),
}));
