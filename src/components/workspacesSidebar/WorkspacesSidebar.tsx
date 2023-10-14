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
import { useState } from "react";
import { Save } from "../../assets/icons/Save";

export const WorkspacesSidebar = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState<false | number>(false);
  const [formInput, setFormInput] = useState("");
  const dispatch = useDispatch();

  const workspaces = useSelector((state: RootState) => {
    return state.board.workspaces;
  });
  const chosenWorkspace = useSelector((state: RootState) => {
    return state.board.chosenWorkspace;
  });
  const handleChange = (id: number) => {
    dispatch(chooseWorkspace({ id }));
  };
  const handleEdit = (id: number) => {
    dispatch(editWorkspace({ id: id, title: formInput }));
    console.log(formInput);
  };
  const handleDelete = (id: number) => {
    dispatch(deleteWorkspace({ id: id }));
  };
  const handleAdd = () => {
    dispatch(addWorkspace({ title: formInput }));
  };
  const onButtonNewWorkspaceClick = () => {
    setIsFormOpen(true);
  };
  const onButtonEditWorkspaceClick = (id: number, title: string) => {
    setIsEditMode(id);
    setFormInput(title);
    setIsFormOpen(true);
  };
  const onButtonAddWorkspaceClick = () => {
    setIsFormOpen(!isFormOpen);
    handleAdd();
    setFormInput("");
  };
  const onButtonSaveWorkspaceClick = () => {
    setIsFormOpen(!isFormOpen);
    if (isEditMode === false) return;
    handleEdit(isEditMode);
    setIsEditMode(false);
    setFormInput("");
  };

  return (
    <div className="workspaces">
      <div className="workspaces-header">
        <div className="workspaces-header-container">
          {workspaces.map((workspace) => {
            const isThisWorkspaceChosen = workspace.id === chosenWorkspace;
            return (
              <div
                className={
                  isThisWorkspaceChosen
                    ? "chosen-workspace-div workspace-picker"
                    : "not-chosen-workspace-div workspace-picker"
                }
                key={workspace.id}
                onClick={() => {
                  handleChange(workspace.id);
                }}
              >
                <div
                  className={
                    isThisWorkspaceChosen
                      ? "chosen-workspace-label"
                      : "not-chosen-workspace-label"
                  }
                >
                  <div className="workspace-icon">{workspace.title[0]}</div>
                  <span className="workspace-span">{workspace.title}</span>
                </div>
                <div className="workspace-buttons-container">
                  <HoverButtons
                    onClickDelete={() => handleDelete(workspace.id)}
                    onClickEdit={() =>
                      onButtonEditWorkspaceClick(workspace.id, workspace.title)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
        {isFormOpen && (
          <div className="workspaces-form-container">
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
            <button
              className="new-workspace-form-footer-button"
              onClick={
                isEditMode === false
                  ? formInput === ""
                    ? () => setIsFormOpen(false)
                    : onButtonAddWorkspaceClick
                  : onButtonSaveWorkspaceClick
              }
            >
              <Save />
              {!isEditMode && (
                <p className="new-workspace-form-footer-button-text">
                  Save new workspace
                </p>
              )}
              {isEditMode && (
                <p className="new-workspace-form-footer-button-text">
                  Save changes
                </p>
              )}
            </button>
          </div>
        )}
        {!isFormOpen && (
          <button
            className="new-worspace-button"
            onClick={onButtonNewWorkspaceClick}
          >
            <Plus fill="#001c39" />
            <p className="new-worspace-button-text">Create workspace</p>
          </button>
        )}
      </div>
      <div className="workspaces-main">
        <div className="workspaces-menu">
          <div className="workspaces-menu-item">
            <Dashboard />
            <div className="workspaces-menu-item-container">
              <p className="workspaces-menu-item-text">Dashboard</p>
            </div>
          </div>
          <div className="workspaces-menu-item">
            <Boards />
            <div className="workspaces-menu-item-container">
              <p className="boards">Boards</p>
            </div>
          </div>
          <div className="workspaces-menu-item">
            <Profile />
            <div className="workspaces-menu-item-container">
              <p className="workspaces-menu-item-text">Profile</p>
            </div>
          </div>
          <div className="workspaces-menu-item">
            <Search />
            <div className="workspaces-menu-item-container">
              <p className="workspaces-menu-item-text">Search</p>
            </div>
          </div>
        </div>
      </div>
      <div className="workspaces-footer">
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
