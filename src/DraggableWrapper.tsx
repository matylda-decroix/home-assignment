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
import {
  moveGroupBetweenWorkspaces,
  moveTaskGroupWithinWorkspace,
  moveTaskWithinGroup,
} from "./store/slices";
import { RootState } from "./store/store";

const selectChosenWorkspaceId = (state: RootState) => {
  return state.board.chosenWorkspace;
};

export const DraggableWrapper = ({ children }: PropsWithChildren) => {
  const workspaceId = useSelector(selectChosenWorkspaceId);
  const dispatch = useDispatch();
  function handleDragStart(event: any) {
    console.log(event);
    dispatch(
      dragStart({
        id: event.active?.data?.current?.item.id,
        title: event.active?.data?.current?.item.title,
      })
    );
  }
  function handleDragEnd(event: any) {
    console.log(event);
    dispatch(dragEnd());
    if (event.over?.id.startsWith("workspace")) {
      dispatch(
        moveGroupBetweenWorkspaces({
          groupId: event.active.data.current.item.id,
          targetWorkspaceId: event.over.data.current.id,
          sourceWorkspaceId: workspaceId,
        })
      );
    } else {
      if (event.over?.data.current.sortable) {
        if (event.active.id.startsWith("group")) {
          dispatch(
            moveTaskGroupWithinWorkspace({
              groupId: event.active.data.current.item.id,
              index: event.over.data.current.sortable.index,
            })
          );
        }
        if (event.active.id.startsWith("task")) {
          dispatch(
            moveTaskWithinGroup({
              groupId: event.active.data.current.group.id,
              taskId: event.active.data.current.item.id,
              index: event.over.data.current.sortable.index,
            })
          );
        }
      }
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
