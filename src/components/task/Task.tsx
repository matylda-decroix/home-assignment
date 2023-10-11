import { useDispatch, useSelector } from "react-redux";
import "./Task.scss";
import { RootState } from "../../store/store";
import { ChangeEventHandler } from "react";
import { toggleTask } from "../../store/slices";

export const Task = ({ id }: { id: number }) => {
  const task = useSelector((state: RootState) => {
    return state.board.tasks[id];
  });
  const dispatch = useDispatch();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // const value = event.target.value;
    dispatch(toggleTask({ id }));
  };
  return (
    <div>
      <input type="checkbox" checked={task.isDone} onChange={handleChange} />
      {task.title}
    </div>
  );
};
