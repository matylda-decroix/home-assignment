import "./TaskGroup.scss";
import { Group } from "../../store/types";
import { Task } from "../task";
import { Plus } from "../../assets/icons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTask } from "../../store/slices";
import { TaskForm } from "../taskForm";
import { TaskGroupHeader } from "./taskGroupHeader";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const TaskGroup = ({ group }: { group: Group }) => {
  //const  = useSortable();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `group-${group.id}`,
      data: { group },
    });
  // const style = transform
  //   ? ({
  //       // transform: `translate3d(${transform.x}px, ${transform.y}px, 100px)`,
  //       // position: "absolute",
  //       opacity: 0.2,
  //     } as React.CSSProperties)
  //   : undefined;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleAdd = (formInput: string) => {
    setIsFormOpen(false);
    dispatch(addTask({ parentId: group.id, title: formInput }));
  };

  const showForm = () => {
    setIsFormOpen(true);
  };

  return (
    <div
      className="task-group-container"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <TaskGroupHeader group={group} />
      <ul className="task-group-list">
        {group.taskIds.map((taskId) => {
          return <Task id={taskId} key={taskId} groupId={group.id} />;
        })}
      </ul>
      <div className="task-group-form-container">
        {isFormOpen && (
          <TaskForm
            submitLabel="Add a card"
            taskTitle=""
            onCancel={() => setIsFormOpen(false)}
            onDataReady={handleAdd}
          />
        )}
        <div className="task-group-button-container">
          <button className="task-group-button" onClick={showForm}>
            <Plus />
            <p className="task-group-button-text">Add a card</p>
          </button>
        </div>
      </div>
    </div>
  );
};
