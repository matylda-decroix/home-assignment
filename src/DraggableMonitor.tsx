import { useDndMonitor } from "@dnd-kit/core";

export const DraggableMonitor = () => {
  useDndMonitor({
    onDragEnd(event) {},
    onDragOver(event) {},
  });
  return null;
};
