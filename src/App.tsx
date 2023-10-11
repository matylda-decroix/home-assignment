import { useSelector } from "react-redux";
import "./App.scss";
import { WorkspacesSidebar } from "./components/workspacesSidebar";
import { RootState } from "./store/store";
import { Task } from "./components/task";

export const App = () => {
  const groups = useSelector((state: RootState) => {
    return state.board.groups;
  });
  return (
    <div className="container">
      <WorkspacesSidebar />
      <div>
        {groups.map((group) => {
          return (
            <p key={group.id}>
              {group.title}
              <ul>
                {group.taskIds.map((taskId) => {
                  return <Task id={taskId} key={taskId} />;
                })}
              </ul>
            </p>
          );
        })}
      </div>
    </div>
  );
};
