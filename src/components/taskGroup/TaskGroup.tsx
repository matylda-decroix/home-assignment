import "./TaskGroup.scss";
import { Group } from "../../store/types";
import { Task } from "../task";
import { Plus } from "../../assets/icons";

export const TaskGroup = ({ group }: { group: Group }) => {
  return (
    <div className="task-group-container">
      <div className="task-group-header">
        <p className="task-group-title">{group.title}</p>
        <p className="task-group-counter">1/3</p>
      </div>
      <ul className="task-group-list">
        {group.taskIds.map((taskId) => {
          return <Task id={taskId} key={taskId} />;
        })}
      </ul>
      <div className="task-group-button-container">
        <button className="task-group-button">
          <Plus />
          <p className="task-group-button-text">Add a card</p>
        </button>
      </div>
    </div>
  );
};
