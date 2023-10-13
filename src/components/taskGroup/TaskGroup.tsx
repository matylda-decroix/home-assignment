import "./TaskGroup.scss";
import { Group } from "../../store/types";
import { Task } from "../task";
import { Plus } from "../../assets/icons";
import { HoverButtons } from "../hoverButtons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const TaskGroup = ({ group }: { group: Group }) => {
  const handleEdit = () => {
    console.log("edit", group.id);
  };
  const handleDelete = () => {
    console.log("delete", group.id);
  };
  const completionNumber = useSelector((state: RootState) => {
    const tasks = state.board.tasks;
    return group.taskIds.map((id) => tasks[id]).filter((task) => task.isDone)
      .length;
  });
  return (
    <div className="task-group-container">
      <div className="task-group-header">
        <p className="task-group-title">{group.title}</p>
        <p className="task-group-counter">
          {completionNumber}/{group.taskIds.length}
        </p>
        <div className="task-group-buttons-container">
          <HoverButtons onClickDelete={handleDelete} onClickEdit={handleEdit} />
        </div>
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
