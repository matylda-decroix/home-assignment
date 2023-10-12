import { useSelector } from "react-redux";
import "./App.scss";
import { WorkspacesSidebar } from "./components/workspacesSidebar";
import { RootState } from "./store/store";
import { NewList } from "./components/newList";
import { TaskGroup } from "./components/taskGroup";

export const App = () => {
  const groups = useSelector((state: RootState) => {
    return state.board.groups;
  });
  return (
    <div className="container">
      <WorkspacesSidebar />
      <div className="workspace-container">
        {groups.map((group) => {
          return (
            <div className="tasks-container" key={group.id}>
              <TaskGroup group={group} />
            </div>
          );
        })}
        <NewList />
      </div>
    </div>
  );
};
