import "./TaskGroup.scss";
import { Group } from "../../store/types";
import { Task } from "../task";
import { Plus } from "../../assets/icons";
import { HoverButtons } from "../hoverButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Close } from "../../assets/icons/Close";
import { useState } from "react";
import { addTask, deleteTaskGroup, editTask } from "../../store/slices";

export const TaskGroup = ({ group }: { group: Group }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState<false | number>(false);
  const [formInput, setFormInput] = useState("");
  const dispatch = useDispatch();

  const completionNumber = useSelector((state: RootState) => {
    const tasks = state.board.tasks;
    return group.taskIds.map((id) => tasks[id]).filter((task) => task.isDone)
      .length;
  });

  const handleEdit = (id: number) => {
    dispatch(editTask({ id: id, title: formInput }));
  };
  const handleDelete = (id: number) => {
    dispatch(deleteTaskGroup({ id: id }));
  };
  const handleAdd = () => {
    dispatch(addTask({ parentId: group.id, title: formInput }));
  };

  const onCloseClick = () => {
    setIsFormOpen(false);
    setIsEditMode(false);
    setFormInput("");
  };
  const onButtonNewTaskClick = () => {
    setIsFormOpen(true);
  };
  const onButtonEditTaskClick = (id: number, title: string) => {
    setIsEditMode(id);
    setFormInput(title);
    setIsFormOpen(true);
  };
  const onButtonAddTaskClick = () => {
    setIsFormOpen(!isFormOpen);
    handleAdd();
    setFormInput("");
  };
  const onButtonSaveTaskClick = () => {
    setIsFormOpen(!isFormOpen);
    if (isEditMode === false) return;
    handleEdit(isEditMode);
    setIsEditMode(false);
    setFormInput("");
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
            onClickDelete={() => handleDelete(group.id)}
            onClickEdit={() => onButtonEditTaskClick(group.id, group.title)}
          />
        </div>
      </div>
      <ul className="task-group-list">
        {group.taskIds.map((taskId) => {
          return <Task id={taskId} key={taskId} />;
        })}
      </ul>
      <div className="task-group-form-container">
        {isFormOpen && (
          <div className="form-container">
            <div className="form-header-container">
              <input className="form-task-checkbox" type="checkbox" readOnly />
              <input
                className="form-task-checkbox"
                type="text"
                placeholder="Title of the new card..."
                value={formInput}
                onInput={(event) => {
                  const target = event.target as HTMLButtonElement;
                  setFormInput(target.value);
                }}
              />
            </div>
            <div className="form-footer-container">
              <button
                className="form-footer-button"
                onClick={
                  isEditMode === false
                    ? formInput === ""
                      ? () => setIsFormOpen(false)
                      : onButtonAddTaskClick
                    : onButtonSaveTaskClick
                }
              >
                {!isEditMode && (
                  <p className="new-card-form-footer-button-text">Add card</p>
                )}
                {isEditMode && (
                  <p className="new-card-form-footer-button-text">
                    Save changes
                  </p>
                )}
              </button>
              <button className="close-button" onClick={onCloseClick}>
                <Close />
              </button>
            </div>
          </div>
        )}
        <div className="task-group-button-container">
          <button className="task-group-button" onClick={onButtonNewTaskClick}>
            <Plus />
            <p className="task-group-button-text">Add a card</p>
          </button>
        </div>
      </div>
    </div>
  );
};
