import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BoardInterface } from "../types";

const initialState: BoardInterface = {
  groups: [
    { id: 1, title: "To do", taskIds: [1, 2, 3] },
    { id: 2, title: "To do second", taskIds: [4, 5, 6] },
    { id: 3, title: "To do second", taskIds: [7, 8] },
  ],
  tasks: {
    1: { id: 1, isDone: false, title: "First" },
    2: { id: 2, isDone: false, title: "Second" },
    3: { id: 3, isDone: false, title: "Third" },
    4: { id: 4, isDone: false, title: "Fourth", subtaskIds: [1, 2, 3] },
    5: { id: 5, isDone: false, title: "Fifth" },
    6: { id: 6, isDone: false, title: "Sixth" },
    7: { id: 7, isDone: false, title: "Seventh" },
    8: { id: 8, isDone: false, title: "Eigth" },
  },
  subtasks: {
    1: { id: 1, isDone: false, title: "First sub" },
    2: { id: 2, isDone: false, title: "Second sub" },
    3: { id: 3, isDone: false, title: "Third sub" },
  },
  workspaces: [
    { id: 1, title: "Workspace first", groupIds: [1, 2] },
    { id: 2, title: "Second workplace", groupIds: [3] },
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
      const currentWorkspaceIndex = state.workspaces.findIndex(
        (workspace) => workspace.id === action.payload.id
      );
      state.workspaces[currentWorkspaceIndex] = {
        id: action.payload.id,
        title: action.payload.title,
        groupIds: [...state.workspaces[currentWorkspaceIndex].groupIds],
      };
    },
    deleteWorkspace: (state, action: PayloadAction<{ id: number }>) => {
      state.workspaces = state.workspaces.filter(
        (workspace) => workspace.id !== action.payload.id
      );
    },
    addTaskGroup: (state, action: PayloadAction<{ title: string }>) => {
      const id = Date.now();
      state.groups.push({
        id: id,
        title: action.payload.title,
        taskIds: [],
      });
      const currentParentIndex = state.workspaces.findIndex(
        (workspace) => workspace.id === state.chosenWorkspace
      );
      state.workspaces[currentParentIndex] = {
        id: state.workspaces[currentParentIndex].id,
        title: state.workspaces[currentParentIndex].title,
        groupIds: [...state.workspaces[currentParentIndex].groupIds, id],
      };
    },
    editTaskGroup: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      const currentTaskGroupIndex = state.groups.findIndex(
        (group) => group.id === action.payload.id
      );
      state.groups[currentTaskGroupIndex] = {
        id: action.payload.id,
        title: action.payload.title,
        taskIds: state.groups[currentTaskGroupIndex].taskIds,
      };
    },
    deleteTaskGroup: (state, action: PayloadAction<{ id: number }>) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload.id
      );
      const currentParentIndex = state.workspaces.findIndex(
        (workspace) => workspace.id === state.chosenWorkspace
      );
      state.workspaces[currentParentIndex] = {
        id: state.workspaces[currentParentIndex].id,
        title: state.workspaces[currentParentIndex].title,
        groupIds: state.workspaces[currentParentIndex].groupIds.filter(
          (groupId) => groupId !== action.payload.id
        ),
      };
    },
    addTask: (
      state,
      action: PayloadAction<{ parentId: Number; title: string }>
    ) => {
      const id = Date.now();
      state.tasks[id] = {
        id: id,
        title: action.payload.title,
        isDone: false,
      };
      const currentParentIndex = state.groups.findIndex(
        (group) => group.id === action.payload.parentId
      );
      state.groups[currentParentIndex] = {
        id: state.groups[currentParentIndex].id,
        title: state.groups[currentParentIndex].title,
        taskIds: [...state.groups[currentParentIndex].taskIds, id],
      };
    },
    editTask: (state, action: PayloadAction<{ id: number; title: string }>) => {
      state.tasks[action.payload.id] = {
        id: action.payload.id,
        title: action.payload.title,
        isDone: state.tasks[action.payload.id].isDone,
      };
    },
    deleteTask: (
      state,
      action: PayloadAction<{ parentId: number; id: number }>
    ) => {
      delete state.tasks[action.payload.id];
      const currentParentIndex = state.groups.findIndex(
        (group) => group.id === action.payload.parentId
      );
      state.groups[currentParentIndex] = {
        id: state.groups[currentParentIndex].id,
        title: state.groups[currentParentIndex].title,
        taskIds: state.groups[currentParentIndex].taskIds.filter(
          (taskId) => taskId !== action.payload.id
        ),
      };
    },
    moveGroupBetweenWorkspaces: (
      state,
      action: PayloadAction<{
        groupId: number;
        sourceWorkspaceId: number;
        targetWorkspaceId: number;
      }>
    ) => {
      const sourceWorkspace = state.workspaces.find(
        (workspace) => workspace.id === action.payload.sourceWorkspaceId
      );
      const targetWorkspace = state.workspaces.find(
        (workspace) => workspace.id === action.payload.targetWorkspaceId
      );
      if (!sourceWorkspace || !targetWorkspace) return;
      sourceWorkspace.groupIds = sourceWorkspace.groupIds.filter(
        (id) => id !== action.payload.groupId
      );
      targetWorkspace.groupIds.push(action.payload.groupId);
    },
    moveTaskGroupWithinWorkspace: (
      state,
      action: PayloadAction<{
        groupId: number;
        index: number;
      }>
    ) => {
      const workspace = state.workspaces.find(
        (workspace) => workspace.id === state.chosenWorkspace
      );
      if (!workspace) return;
      const currentPosition = workspace.groupIds.indexOf(
        action.payload.groupId
      );
      workspace.groupIds.splice(currentPosition, 1);
      workspace.groupIds.splice(
        action.payload.index,
        0,
        action.payload.groupId
      );
    },
    moveTaskWithinGroup: (
      state,
      action: PayloadAction<{
        groupId: number;
        taskId: number;
        index: number;
      }>
    ) => {
      const group = state.groups.find(
        (group) => group.id === action.payload.groupId
      );
      if (!group) return;
      const currentPosition = group.taskIds.indexOf(action.payload.taskId);
      group.taskIds.splice(currentPosition, 1);
      group.taskIds.splice(action.payload.index, 0, action.payload.taskId);
    },
    moveWorkspaceWithinWorkspaces: (
      state,
      action: PayloadAction<{
        workspaceId: number;
        index: number;
      }>
    ) => {
      const workspace = state.workspaces.find(
        (workspace) => workspace.id === action.payload.workspaceId
      );
      if (!workspace) return;
      const currentPosition = state.workspaces.findIndex((workspace) => {
        return workspace.id === action.payload.workspaceId;
      });
      state.workspaces.splice(currentPosition, 1);
      state.workspaces.splice(action.payload.index, 0, workspace);
    },
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
  moveGroupBetweenWorkspaces,
  moveTaskGroupWithinWorkspace,
  moveTaskWithinGroup,
  moveWorkspaceWithinWorkspaces,
} = boardSlice.actions;
