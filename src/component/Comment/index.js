import "./comment.styles.css";
import { useState } from "react";
import AddComment from "../AddComment";

const Comment = ({
  value = "",
  onDelete = () => {},
  onAddComment = () => {},
  onSaveComment = () => {}
}) => {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleCommentInput = () => {
    setShow((prev) => !prev);
  };

  const closeCommentInput = () => {
    setShow(() => false);
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    toggleCommentInput();
  };

  const handleAddToComment = (comment) => {
    if (comment.value) {
      if (editMode) {
        onSaveComment(comment);
        toggleEditMode();
      } else {
        onAddComment(comment);
      }
    }
    closeCommentInput();
  };

  return (
    <div>
      <div className="comment-box">
        <div className="comment-box-text">{value}</div>
        <button className="btn btn-danger-stroked mr-sm" onClick={onDelete}>
          DELETE
        </button>
        <button
          className="btn btn-primary-stroked mr-sm"
          onClick={toggleCommentInput}
        >
          REPLY
        </button>
        <button className="btn btn-success-stroked" onClick={toggleEditMode}>
          EDIT
        </button>
      </div>
      {show && (
        <AddComment
          editMode={editMode}
          value={value}
          onAddComment={handleAddToComment}
        />
      )}
    </div>
  );
};

export default Comment;
