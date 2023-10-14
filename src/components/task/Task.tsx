import { useDispatch, useSelector } from "react-redux";
import "./Task.scss";
import { RootState } from "../../store/store";
import { deleteTask, editTask, toggleTask } from "../../store/slices";
import { Check } from "../../assets/icons/Check";
import { HoverButtons } from "../hoverButtons";
import { useState } from "react";
import { TaskForm } from "../taskForm";

export const Task = ({ groupId, id }: { groupId: number; id: number }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const task = useSelector((state: RootState) => {
    return state.board.tasks[id];
  });
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(toggleTask({ id }));
  };
  const handleEdit = (title: string) => {
    dispatch(editTask({ id, title }));
    setIsFormOpen(false);
  };
  const handleDelete = () => {
    dispatch(deleteTask({ parentId: groupId, id: id }));
  };
  return isFormOpen ? (
    <TaskForm
      submitLabel="Save changes"
      taskTitle={task.title}
      onCancel={() => setIsFormOpen(false)}
      onDataReady={handleEdit}
    />
  ) : (
    <div className="task-div">
      <div className="task-container">
        <span className="checkbox-span">
          <input
            className="task-checkbox"
            type="checkbox"
            checked={task.isDone}
            onChange={handleChange}
          />
          {task.isDone && <Check />}
        </span>
        <p className="task-text">{task.title}</p>
      </div>
      <div className="buttons-container">
        <HoverButtons
          onClickDelete={handleDelete}
          onClickEdit={() => setIsFormOpen(true)}
        />
      </div>
    </div>
  );
};
