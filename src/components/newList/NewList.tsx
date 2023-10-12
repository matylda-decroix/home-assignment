import { Plus } from "../../assets/icons";
import "./NewList.scss";

export const NewList = () => {
  return (
    <div className="new-list-container">
      <button className="new-list-button">
        <Plus />
        <p className="new-list-button-text">Add another list</p>
      </button>
    </div>
  );
};
