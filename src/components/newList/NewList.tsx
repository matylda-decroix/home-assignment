import { useState } from "react";
import { Plus } from "../../assets/icons";
import { Close } from "../../assets/icons/Close";
import "./NewList.scss";
import {
  addTaskGroup,
  deleteTaskGroup,
  editTaskGroup,
} from "../../store/slices";
import { useDispatch } from "react-redux";

export const NewList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState<false | number>(false);
  const [formInput, setFormInput] = useState("");
  const dispatch = useDispatch();

  // const handleEdit = (id: number) => {
  //   dispatch(editTaskGroup({ id: id, title: formInput }));
  // };
  // const handleDelete = (id: number) => {
  //   dispatch(deleteTaskGroup({ id: id }));
  // };
  // const handleAdd = () => {
  //   dispatch(addTaskGroup({ title: formInput }));
  // };
  const onCloseClick = () => {
    setIsFormOpen(false);
    setIsEditMode(false);
    setFormInput("");
  };
  // const onButtonNewTaskGroupClick = () => {
  //   setIsFormOpen(true);
  // };
  // const onButtonEditTaskGroupClick = (id: number, title: string) => {
  //   setIsEditMode(id);
  //   setFormInput(title);
  //   setIsFormOpen(true);
  // };
  // const onButtonAddTaskGroupClick = () => {
  //   setIsFormOpen(!isFormOpen);
  //   handleAdd();
  //   setFormInput("");
  // };
  // const onButtonSaveTaskGroupClick = () => {
  //   setIsFormOpen(!isFormOpen);
  //   if (isEditMode === false) return;
  //   handleEdit(isEditMode);
  //   setIsEditMode(false);
  //   setFormInput("");
  // };
  return (
    <div className="new-list-container">
      {isFormOpen && (
        <div className="new-list-form-container">
          <div className="new-list-form-header-container">
            <input
              className="new-list-form-task-checkbox"
              type="checkbox"
              readOnly
            />
            <input
              className="new-list-form-task-checkbox"
              type="text"
              placeholder="Title of the new card..."
              value={formInput}
              onInput={(event) => {
                const target = event.target as HTMLButtonElement;
                setFormInput(target.value);
              }}
            />
          </div>
          <div className="new-list-form-footer-container">
            <button
              className="new-list-form-footer-button"
              // onClick={onButtonAddGroupClick}
            >
              Add card
            </button>
            <button className="new-list-close-button" onClick={onCloseClick}>
              <Close />
            </button>
          </div>
        </div>
      )}
      {!isFormOpen && (
        <button className="new-list-button">
          <Plus />
          <p className="new-list-button-text">Add another list</p>
        </button>
      )}
    </div>
  );
};
