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
import { addWorkspace } from "../../store/slices";
import { useState } from "react";
import { WorkspacesListItem } from "./WorkspacesListItem";
import { WorkspacesForm } from "./WorkspacesForm";
import { SortableContext } from "@dnd-kit/sortable";

export const WorkspacesSidebar = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();

  const workspaces = useSelector((state: RootState) => {
    return state.board.workspaces;
  });
  const chosenWorkspace = useSelector((state: RootState) => {
    return state.board.chosenWorkspace;
  });

  const handleAdd = (title: string) => {
    dispatch(addWorkspace({ title }));
    setIsFormOpen(false);
  };
  const onButtonNewWorkspaceClick = () => {
    setIsFormOpen(true);
  };
  return (
    <div className="workspaces">
      <div className="workspaces-header">
        <SortableContext
          items={
            workspaces?.map((workspace) => `workspace-${workspace.id}`) ?? []
          }
        >
          <div className="workspaces-header-container">
            {workspaces.map((workspace) => {
              const isThisWorkspaceChosen = workspace.id === chosenWorkspace;
              return (
                <WorkspacesListItem
                  isThisWorkspaceChosen={isThisWorkspaceChosen}
                  workspace={workspace}
                  key={workspace.id}
                />
              );
            })}
          </div>
        </SortableContext>
        {isFormOpen ? (
          <WorkspacesForm
            submitLabel="Save new workspace"
            onCancel={() => setIsFormOpen(false)}
            workspaceTitle=""
            onDataReady={handleAdd}
          />
        ) : (
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
