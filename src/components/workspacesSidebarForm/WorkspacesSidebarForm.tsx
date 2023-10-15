import "./WorkspacesSidebarForm.scss";
import { FormEventHandler, useState } from "react";
import { Save } from "../../assets/icons/Save";
import { Close } from "../../assets/icons/Close";

type Props = {
  submitLabel: string;
  workspaceTitle: string;
  onCancel: () => void;
  onDataReady: (taskTitle: string) => void;
};

export const WorkspacesForm = ({
  submitLabel,
  workspaceTitle = "",
  onCancel,
  onDataReady,
}: Props) => {
  const [formInput, setFormInput] = useState(workspaceTitle);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onDataReady(formInput);
  };

  return (
    <form className="workspaces-form-container" onSubmit={handleSubmit}>
      <div className="new-workspace-form-header-container">
        <div className="new-workspace-icon"> </div>
        <input
          className="new-workspace-form-task-checkbox"
          type="text"
          placeholder="Workspace name"
          value={formInput}
          onInput={(event) => {
            const target = event.target as HTMLButtonElement;
            setFormInput(target.value);
          }}
        />
      </div>
      <div className="workspaces-form-button-container">
        <button className="new-workspace-form-footer-button" type="submit">
          <Save />
          <span className="new-workspace-form-footer-button-text">
            {submitLabel}
          </span>
        </button>
        <button
          className="new-workspace-close-button"
          type="button"
          onClick={onCancel}
        >
          <Close />
        </button>
      </div>
    </form>
  );
};
