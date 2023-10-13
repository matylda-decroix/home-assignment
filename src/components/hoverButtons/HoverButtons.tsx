import { Delete } from "../../assets/icons/Delete";
import { Edit } from "../../assets/icons/Edit";
import "./HoverButtons.scss";

export const HoverButtons = ({
  onClickEdit,
  onClickDelete,
}: {
  onClickEdit: React.MouseEventHandler<HTMLButtonElement>;
  onClickDelete: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="hover-buttons-container">
      <button className="edit-button" onClick={onClickEdit}>
        <Edit />
      </button>
      <button className="delete-button" onClick={onClickDelete}>
        <Delete />
      </button>
    </div>
  );
};
