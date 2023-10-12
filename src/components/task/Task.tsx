import { useDispatch, useSelector } from "react-redux";
import "./Task.scss";
import { RootState } from "../../store/store";
import { toggleTask } from "../../store/slices";

export const Task = ({ id }: { id: number }) => {
  const task = useSelector((state: RootState) => {
    return state.board.tasks[id];
  });
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(toggleTask({ id }));
  };
  return (
    <button className="task-container" onClick={handleChange}>
      <input className="task-checkbox" type="checkbox" checked={task.isDone} />
      <p className="task-text">{task.title}</p>
    </button>
  );
};
