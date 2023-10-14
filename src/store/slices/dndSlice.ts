import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DndInterface } from "../types";

const initialState: DndInterface = {
  element: null,
};

export const dndSlice = createSlice({
  name: "dnd",
  initialState,
  reducers: {
    dragStart: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      state.element = action.payload;
    },
    dragEnd: (state) => {
      state.element = null;
    },
  },
});

export const { dragEnd, dragStart } = dndSlice.actions;
