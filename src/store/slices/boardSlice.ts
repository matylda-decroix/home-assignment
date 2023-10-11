import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardInterface } from "../types";

const initialState: BoardInterface = {
  groups: [{ id: 1, title: "To do", taskIds: [1, 2, 3] }],
  tasks: {
    1: { id: 1, isDone: false, title: "First" },
    2: { id: 2, isDone: false, title: "Second" },
    3: { id: 3, isDone: false, title: "Third" },
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    toggleTask: (state, action: PayloadAction<{ id: number }>) => {
      const task = state.tasks[action.payload.id];
      task.isDone = !task.isDone;
    },
  },
});

export const { toggleTask } = boardSlice.actions;
