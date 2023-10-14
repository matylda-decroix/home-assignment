import "./WorkspacesSidebar.scss";
import { UserProfile } from "../userProfile";
import { WorkspaceSettings } from "../workspaceSettings";
import { Plus } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Search } from "../../assets/icons/Search";
import { Boards } from "../../assets/icons/Boards";
import { Dashboard } from "../../assets/icons/Dashboard";
import { Profile } from "../../assets/icons/Profile";
import {
  addWorkspace,
  chooseWorkspace,
  deleteWorkspace,
  editWorkspace,
} from "../../store/slices";
import { HoverButtons } from "../hoverButtons";
import { FormEventHandler, useState } from "react";
import { Save } from "../../assets/icons/Save";
import { useDroppable } from "@dnd-kit/core";
import { WorkspacesListItem } from "./WorkspacesListItem";
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
      <button className="new-workspace-form-footer-button" type="submit">
        <Save />
        <span className="new-workspace-form-footer-button-text">
          {submitLabel}
        </span>
      </button>
      <button
        className="new-list-close-button"
        type="button"
        onClick={onCancel}
      >
        <Close />
      </button>
    </form>
  );
};
