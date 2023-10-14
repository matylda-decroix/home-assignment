import { DragOverlay } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export const DraggablePreview = () => {
  const element = useSelector((state: RootState) => state.dnd.element);
  return (
    <DragOverlay>
      {element && (
        <div>
          {element.id} {element.type}
        </div>
      )}
    </DragOverlay>
  );
};
