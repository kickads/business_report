import { create } from 'zustand';
import { createConsolidatedSlice } from '../slices';
import { devtools } from 'zustand/middleware';

export const useBoundStore = create(devtools((...a) => ({
  ...createConsolidatedSlice(...a)
})));