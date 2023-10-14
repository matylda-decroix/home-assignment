import { useState } from "react";
import { Plus } from "../../assets/icons";
import "./NewList.scss";
import { addTaskGroup } from "../../store/slices";
import { useDispatch } from "react-redux";
import { TaskGroupForm } from "../taskGroupForm";

export const NewList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useDispatch();

  const handleAdd = (title: string) => {
    dispatch(addTaskGroup({ title }));
  };
  const onCloseClick = () => {
    setIsFormOpen(false);
  };
  const enterAddMode = () => {
    setIsFormOpen(true);
  };
  return (
    <div className="new-list-container">
      {isFormOpen && (
        <TaskGroupForm
          onCancel={onCloseClick}
          taskGroupTitle=""
          submitLabel="Add list"
          onDataReady={handleAdd}
        />
      )}
      {!isFormOpen && (
        <button className="new-list-button" onClick={enterAddMode}>
          <Plus />
          <p className="new-list-button-text">Add another list</p>
        </button>
      )}
    </div>
  );
};
