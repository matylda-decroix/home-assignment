import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardInterface } from "../types";

const initialState: BoardInterface = {
  groups: [
    { id: 1, title: "To do", taskIds: [1, 2, 3] },
    {
      id: 2,
      title: "To do secondjbjhfbrfjlnrlqjnfjklqsecondjbjhfbrfjlnrlqjnfjklq",
      taskIds: [4, 5, 6],
    },
    {
      id: 3,
      title: "To do secondjbjhfb rfjlnrlqjnfjklq jknjnkjn",
      taskIds: [7, 8],
    },
  ],
  tasks: {
    1: {
      id: 1,
      isDone: false,
      title: "Firstkjnrfhjqbjnrfnriunfiwignrfhjqbjnrfnriunfi",
    },
    2: {
      id: 2,
      isDone: false,
      title: "Secondjnj jknfjnn oinjnjnnn ojoi nj jknfjnn oinjnjnn",
    },
    3: { id: 3, isDone: false, title: "Third" },
    4: { id: 4, isDone: false, title: "Fourth" },
    5: { id: 5, isDone: false, title: "Fifth" },
    6: { id: 6, isDone: false, title: "Sixth" },
    7: { id: 7, isDone: false, title: "Seventh" },
    8: { id: 8, isDone: false, title: "Eigth" },
  },
  workspaces: [
    {
      id: 1,
      title: "Workspace firsthwrihuhiuhgiuginfinrfirsthwrihuhiuhgiuginfinr",
      groupIds: [1, 2, 3],
    },
    {
      id: 2,
      title: "Second workspace jknigiwngi jknjrnnonoin jnjnoin",
      groupIds: [],
    },
    { id: 3, title: "Second workspace", groupIds: [] },
  ],
  chosenWorkspace: 1,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    toggleTask: (state, action: PayloadAction<{ id: number }>) => {
      const task = state.tasks[action.payload.id];
      task.isDone = !task.isDone;
    },
    chooseWorkspace: (state, action: PayloadAction<{ id: number }>) => {
      state.chosenWorkspace = action.payload.id;
    },
    addWorkspace: (state, action: PayloadAction<{ title: string }>) => {
      state.workspaces.push({
        id: Date.now(),
        title: action.payload.title,
        groupIds: [],
      });
    },
    editWorkspace: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      state.workspaces[action.payload.id] = {
        id: action.payload.id,
        title: action.payload.title,
        groupIds: state.workspaces[action.payload.id].groupIds,
      };
    },
    deleteWorkspace: (state, action: PayloadAction<{ id: number }>) => {
      state.workspaces = state.workspaces.filter(
        (workspace) => workspace.id !== action.payload.id
      );
    },
    addTaskGroup: (state, action: PayloadAction<{ title: string }>) => {
      state.groups.push({
        id: Date.now(),
        title: action.payload.title,
        taskIds: [],
      });
    },
    editTaskGroup: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      state.groups[action.payload.id] = {
        id: action.payload.id,
        title: action.payload.title,
        taskIds: state.groups[action.payload.id].taskIds,
      };
    },
    deleteTaskGroup: (state, action: PayloadAction<{ id: number }>) => {
      state.groups.splice(action.payload.id, 1);
    },
    addTask: () => {},
    editTask: () => {},
    deleteTask: () => {},
  },
});

export const {
  toggleTask,
  chooseWorkspace,
  addWorkspace,
  editWorkspace,
  deleteWorkspace,
  addTaskGroup,
  editTaskGroup,
  deleteTaskGroup,
  addTask,
  editTask,
  deleteTask,
} = boardSlice.actions;
