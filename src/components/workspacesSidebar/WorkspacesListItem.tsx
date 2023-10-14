import "./WorkspacesSidebar.scss";
import { useDispatch } from "react-redux";
import {
  chooseWorkspace,
  deleteWorkspace,
  editWorkspace,
} from "../../store/slices";
import { HoverButtons } from "../hoverButtons";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Workspace } from "../../store/types";
import { WorkspacesForm } from "./WorkspacesForm";

export const WorkspacesListItem = ({
  workspace,
  isThisWorkspaceChosen,
}: {
  workspace: Workspace;
  isThisWorkspaceChosen: boolean;
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { isOver, setNodeRef } = useDroppable({
    id: `workspaces-${workspace.id}`,
    data: workspace,
  });
  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };
  const handleChange = (id: number) => {
    dispatch(chooseWorkspace({ id }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteWorkspace({ id: id }));
  };
  const handleEdit = (title: string) => {
    dispatch(editWorkspace({ id: workspace.id, title }));
    setIsFormOpen(false);
  };

  return isFormOpen ? (
    <WorkspacesForm
      workspaceTitle={workspace.title}
      submitLabel="Save changes"
      onCancel={() => setIsFormOpen(false)}
      onDataReady={handleEdit}
    />
  ) : (
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
      ref={setNodeRef}
    >
      <div
        className={
          isThisWorkspaceChosen
            ? "chosen-workspace-label"
            : "not-chosen-workspace-label"
        }
      >
        <div className="workspace-icon">{workspace.title[0]}</div>
        <span className="workspace-span" style={style}>
          {workspace.title}
        </span>
      </div>
      <div className="workspace-buttons-container">
        <HoverButtons
          onClickDelete={() => handleDelete(workspace.id)}
          onClickEdit={() => setIsFormOpen(true)}
        />
      </div>
    </div>
  );
};
