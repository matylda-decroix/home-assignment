import { FormEventHandler, useState } from "react";
import { Close } from "../../assets/icons/Close";
import "./TaskGroupForm.scss";

type Props = {
  submitLabel: string;
  taskGroupTitle: string;
  onCancel: () => void;
  onDataReady: (taskTitle: string) => void;
};

export const TaskGroupForm = ({
  submitLabel,
  taskGroupTitle = "",
  onCancel,
  onDataReady,
}: Props) => {
  const [formInput, setFormInput] = useState(taskGroupTitle);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onDataReady(formInput);
  };

  return (
    <form className="edit-group-form-container" onSubmit={handleSubmit}>
      <div className="new-list-form-header-container">
        <input
          className="new-list-form-task-checkbox"
          type="text"
          placeholder="Title of the new card..."
          value={formInput}
          onChange={(event) => {
            setFormInput(event.target.value);
          }}
        />
      </div>
      <div className="new-list-form-footer-container">
        <button className="new-list-form-footer-button" type="submit">
          {submitLabel}
        </button>
        <button
          className="new-list-close-button"
          type="button"
          onClick={onCancel}
        >
          <Close />
        </button>
      </div>
    </form>
  );
};
