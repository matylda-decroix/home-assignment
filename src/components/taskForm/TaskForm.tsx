import { Close } from "../../assets/icons/Close";
import { FormEventHandler, useState } from "react";
import "./TaskForm.scss";

type Props = {
  submitLabel: string;
  taskTitle?: string;
  onCancel: () => void;
  onDataReady: (taskTitle: string) => void;
};

export const TaskForm = ({
  submitLabel,
  taskTitle = "",
  onCancel,
  onDataReady,
}: Props) => {
  const [formInput, setFormInput] = useState(taskTitle);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onDataReady(formInput);
  };

  return (
    <form className="task-form-container" onSubmit={handleSubmit}>
      <div className="task-form-header-container">
        <input className="form-task-checkbox" type="checkbox" readOnly />
        <input
          className="form-task-checkbox"
          type="text"
          placeholder="Title of the new card..."
          value={formInput}
          onChange={(event) => {
            setFormInput(event.target.value);
          }}
        />
      </div>
      <div className="task-form-footer-container">
        <button className="task-form-footer-button" type="submit">
          <p className="task-form-footer-button-text">{submitLabel}</p>
        </button>
        <button className="task-close-button" onClick={onCancel} type="button">
          <Close />
        </button>
      </div>
    </form>
  );
};
