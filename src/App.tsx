import { useSelector } from "react-redux";
import "./App.scss";
import { WorkspacesSidebar } from "./components/workspacesSidebar";
import { RootState } from "./store/store";
import { NewList } from "./components/newList";
import { TaskGroup } from "./components/taskGroup";
import { createSelector } from "@reduxjs/toolkit";
import { SortableContext } from "@dnd-kit/sortable";

function isDefined<T>(val: T | undefined | null): val is T {
  return val !== undefined && val !== null;
}
const selectChosenWorkspaceId = (state: RootState) => {
  return state.board.chosenWorkspace;
};
const selectWorkspaces = (state: RootState) => {
  return state.board.workspaces;
};
const selectGroups = (state: RootState) => {
  return state.board.groups;
};
const selectWorkspaceGroups = createSelector(
  [selectChosenWorkspaceId, selectWorkspaces, selectGroups],
  (choosenWorkspaceId, workspaces, groups) => {
    const chosenWorkspace = workspaces.find(
      (workspace) => workspace.id === choosenWorkspaceId
    );
    return chosenWorkspace?.groupIds
      .map((groupId) => groups.find((group) => group.id === groupId))
      .filter(isDefined);
  }
);

export const App = () => {
  const groups = useSelector(selectWorkspaceGroups);

  return (
    <div className="container">
      <WorkspacesSidebar />
      <SortableContext
        items={groups?.map((group) => `group-${group.id}`) ?? []}
      >
        <div className="workspace-container">
          {groups?.map((group) => {
            return (
              <div className="tasks-container" key={group.id}>
                <TaskGroup group={group} />
              </div>
            );
          }) ?? []}

          <NewList />
        </div>
      </SortableContext>
    </div>
  );
};
