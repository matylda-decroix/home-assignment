import { useDispatch, useSelector } from "react-redux";
import { Group } from "../../store/types";
import { RootState } from "../../store/store";
import { HoverButtons } from "../hoverButtons";
import { useState } from "react";
import { deleteTaskGroup, editTaskGroup } from "../../store/slices";
import { TaskGroupForm } from "../taskGroupForm";
import "./TaskGroupHeader.scss";

export const TaskGroupHeader = ({ group }: { group: Group }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();

  const completionNumber = useSelector((state: RootState) => {
    const tasks = state.board.tasks;
    return group.taskIds.map((id) => tasks[id]).filter((task) => task.isDone)
      .length;
  });
  const deleteGroup = () => {
    dispatch(deleteTaskGroup({ id: group.id }));
  };

  const showForm = () => {
    setIsFormOpen(true);
  };
  const editGroup = (title: string) => {
    dispatch(editTaskGroup({ id: group.id, title }));
    setIsFormOpen(false);
  };
  return isFormOpen ? (
    <TaskGroupForm
      submitLabel="Save changes"
      onCancel={() => setIsFormOpen(false)}
      onDataReady={editGroup}
      taskGroupTitle={group.title}
    />
  ) : (
    <div className="task-group-header">
      <p className="task-group-title">{group.title}</p>
      <p className="task-group-counter">
        {completionNumber}/{group.taskIds.length}
      </p>
      <div className="task-group-buttons-container">
        <HoverButtons onClickDelete={deleteGroup} onClickEdit={showForm} />
      </div>
    </div>
  );
};
