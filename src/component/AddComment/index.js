import { memo, useRef, useEffect } from "react";
import TextInput from "../TextInput";
import "./commentInput.styles.css";

const CommentCreator = ({
  onAddComment = () => {},
  value = "",
  editMode = false
}) => {
  const commentRef = useRef();

  useEffect(() => {
    if (editMode && commentRef?.current) {
      commentRef.current.value = value;
    }
  }, [editMode, commentRef, value]);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    onAddComment({ value: commentRef.current.value });
    commentRef.current.value = "";
  };

  return (
    <form className="comment-input-box" onSubmit={handleFormSubmission}>
      <TextInput
        ref={commentRef}
        placeholder="Enter a comment"
        type="text"
        name="comment"
      />
      <div>
        <button className="btn btn-primary-solid">
          {editMode ? "SAVE" : "ADD"}&nbsp;COMMENT
        </button>
      </div>
    </form>
  );
};

export default memo(CommentCreator);
