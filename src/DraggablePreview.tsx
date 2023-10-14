import { DragOverlay } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import "./components/task/Task.scss";

export const DraggablePreview = () => {
  const element = useSelector((state: RootState) => state.dnd.element);
  return (
    <DragOverlay>
      {element && (
        <div className="task-div">
          <div className="task-container">
            <p className="task-text">{element.title}</p>
          </div>
        </div>
      )}
    </DragOverlay>
  );
};
