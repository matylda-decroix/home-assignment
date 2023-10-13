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
import { chooseWorkspace } from "../../store/slices";
import { HoverButtons } from "../hoverButtons";

export const WorkspacesSidebar = () => {
  const workspaces = useSelector((state: RootState) => {
    return state.board.workspaces;
  });
  const chosenWorkspace = useSelector((state: RootState) => {
    return state.board.chosenWorkspace;
  });
  const dispatch = useDispatch();
  const handleChange = (id: number) => {
    dispatch(chooseWorkspace({ id }));
  };
  const handleEdit = () => {
    console.log("edit");
  };
  const handleDelete = () => {
    console.log("delete");
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
                  <div className="workspace-buttons-container">
                    <HoverButtons
                      onClickDelete={handleDelete}
                      onClickEdit={handleEdit}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="new-worspace-button">
          <Plus fill="#001c39" />
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
