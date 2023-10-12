import "./WorkspacesSidebar.scss";
import { UserProfile } from "../userProfile";
import { WorkspaceSettings } from "../workspaceSettings";
import { Plus } from "../../assets/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Search } from "../../assets/icons/Search";
import { Boards } from "../../assets/icons/Boards";
import { Dashboard } from "../../assets/icons/Dashboard";
import { Profile } from "../../assets/icons/Profile";

export const WorkspacesSidebar = () => {
  const workspaces = useSelector((state: RootState) => {
    return state.board.workspaces;
  });
  const chosenWorkplace = useSelector((state: RootState) => {
    return state.board.chosenWorkplace;
  });
  return (
    <div className="workspaces">
      <div className="workspaces-header">
        <div className="workspaces-header-container">
          {workspaces.map((workspace) => {
            return (
              <div className="workspaces-container" key={workspace.id}>
                <input
                  className="workspace-checkbox"
                  type="checkbox"
                  checked={workspace.id === chosenWorkplace}
                />
              </div>
            );
          })}
        </div>
        <button className="new-worspace-button">
          <Plus />
          <p className="new-worspace-button-text">Create workspace</p>
        </button>
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
