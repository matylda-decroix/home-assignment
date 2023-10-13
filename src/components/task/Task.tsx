import { useDispatch, useSelector } from "react-redux";
import "./Task.scss";
import { RootState } from "../../store/store";
import { toggleTask } from "../../store/slices";
import { Check } from "../../assets/icons/Check";
import { HoverButtons } from "../hoverButtons";

export const Task = ({ id }: { id: number }) => {
  const task = useSelector((state: RootState) => {
    return state.board.tasks[id];
  });
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(toggleTask({ id }));
  };
  const handleEdit = () => {
    console.log("edit", id);
  };
  const handleDelete = () => {
    console.log("delete", id);
  };
  return (
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
        <HoverButtons onClickDelete={handleDelete} onClickEdit={handleEdit} />
      </div>
    </div>
  );
};
