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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const WorkspacesListItem = ({
  workspace,
  isThisWorkspaceChosen,
}: {
  workspace: Workspace;
  isThisWorkspaceChosen: boolean;
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    attributes,
    listeners,
    setNodeRef: setNodeRefWorkspace,
    transform,
    transition,
  } = useSortable({
    id: `workspace-${workspace.id}`,
    data: { item: { id: workspace.id, title: workspace.title } },
  });
  const styleWorkspace = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { isOver, setNodeRef } = useDroppable({
    id: `workspaces-${workspace.id}`,
    data: workspace,
  });
  const style = {
    color: isOver ? "#007DFC" : undefined,
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
      ref={setNodeRefWorkspace}
      style={styleWorkspace}
      {...listeners}
      {...attributes}
    >
      <div
        className={
          isThisWorkspaceChosen
            ? "chosen-workspace-label"
            : "not-chosen-workspace-label"
        }
        ref={setNodeRef}
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
