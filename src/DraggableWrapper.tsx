import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dragEnd, dragStart } from "./store/slices/dndSlice";
import { DraggablePreview } from "./DraggablePreview";
import { moveGroupBetweenWorkspaces } from "./store/slices";
import { RootState } from "./store/store";

const selectChosenWorkspaceId = (state: RootState) => {
  return state.board.chosenWorkspace;
};

export const DraggableWrapper = ({ children }: PropsWithChildren) => {
  const workspaceId = useSelector(selectChosenWorkspaceId);
  const dispatch = useDispatch();
  function handleDragStart(event: any) {
    console.log(event);
    dispatch(dragStart({ id: event.data?.current?.id, type: "unknown" }));
  }
  function handleDragEnd(event: any) {
    console.log(event);
    dispatch(dragEnd());
    if (event.over.id.startsWith("workspace")) {
      dispatch(
        moveGroupBetweenWorkspaces({
          groupId: event.active.data.current.group.id,
          targetWorkspaceId: event.over.data.current.id,
          sourceWorkspaceId: workspaceId,
        })
      );
    }
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {children}
      <DraggablePreview />
    </DndContext>
  );
};
