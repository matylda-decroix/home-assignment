import { useState } from "react";
import { Plus } from "../../assets/icons";
import { Close } from "../../assets/icons/Close";
import "./NewList.scss";
import { addTaskGroup } from "../../store/slices";
import { useDispatch } from "react-redux";

export const NewList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formInput, setFormInput] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addTaskGroup({ title: formInput }));
  };
  const onCloseClick = () => {
    setIsFormOpen(false);
    setFormInput("");
  };
  const enterAddMode = () => {
    setIsFormOpen(true);
  };
  const onButtonAddTaskGroupClick = () => {
    setIsFormOpen(false);
    handleAdd();
    setFormInput("");
  };
  return (
    <div className="new-list-container">
      {isFormOpen && (
        <div className="new-list-form-container">
          <div className="new-list-form-header-container">
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
              onClick={onButtonAddTaskGroupClick}
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
        <button className="new-list-button" onClick={enterAddMode}>
          <Plus />
          <p className="new-list-button-text">Add another list</p>
        </button>
      )}
    </div>
  );
};
