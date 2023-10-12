import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardInterface } from "../types";

const initialState: BoardInterface = {
  groups: [
    { id: 1, title: "To do", taskIds: [1, 2, 3] },
    { id: 2, title: "To do second", taskIds: [4, 5, 6] },
  ],
  tasks: {
    1: { id: 1, isDone: false, title: "First" },
    2: { id: 2, isDone: false, title: "Second" },
    3: { id: 3, isDone: false, title: "Third" },
    4: { id: 4, isDone: false, title: "Fourth" },
    5: { id: 5, isDone: false, title: "Fifth" },
    6: { id: 6, isDone: false, title: "Sixth" },
    // 7: { id: 7, isDone: false, title: "Subtask first" },
    // 8: { id: 8, isDone: false, title: "Subtask second" },
  },
  workspaces: [
    { id: 1, title: "Workspace first" },
    { id: 2, title: "Workspace second" },
  ],
  chosenWorkplace: 1,
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
