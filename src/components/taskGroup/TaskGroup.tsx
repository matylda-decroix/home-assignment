import "./TaskGroup.scss";
import { Group } from "../../store/types";
import { Task } from "../task";
import { Plus } from "../../assets/icons";
import { HoverButtons } from "../hoverButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { addTask, deleteTaskGroup, editTask } from "../../store/slices";
import { TaskForm } from "../taskForm";

export const TaskGroup = ({ group }: { group: Group }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();

  const completionNumber = useSelector((state: RootState) => {
    const tasks = state.board.tasks;
    return group.taskIds.map((id) => tasks[id]).filter((task) => task.isDone)
      .length;
  });

  const handleAdd = (formInput: string) => {
    setIsFormOpen(false);
    dispatch(addTask({ parentId: group.id, title: formInput }));
  };

  const deleteGroup = (id: number) => {
    dispatch(deleteTaskGroup({ id: id }));
  };

  const showForm = () => {
    setIsFormOpen(true);
  };
  const editGroup = (id: number, title: string) => {
    setIsFormOpen(true);
  };
  return (
    <div className="task-group-container">
      <div className="task-group-header">
        <p className="task-group-title">{group.title}</p>
        <p className="task-group-counter">
          {completionNumber}/{group.taskIds.length}
        </p>
        <div className="task-group-buttons-container">
          <HoverButtons
            onClickDelete={() => deleteGroup(group.id)}
            onClickEdit={() => editGroup(group.id, group.title)}
          />
        </div>
      </div>
      <ul className="task-group-list">
        {group.taskIds.map((taskId) => {
          return <Task id={taskId} key={taskId} groupId={group.id} />;
        })}
      </ul>
      <div className="task-group-form-container">
        {isFormOpen && (
          <TaskForm
            submitLabel="Add a card"
            taskTitle=""
            onCancel={() => setIsFormOpen(false)}
            onDataReady={handleAdd}
          />
        )}
        <div className="task-group-button-container">
          <button className="task-group-button" onClick={showForm}>
            <Plus />
            <p className="task-group-button-text">Add a card</p>
          </button>
        </div>
      </div>
    </div>
  );
};
