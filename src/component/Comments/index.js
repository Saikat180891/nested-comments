import Comment from "../Comment";

const Comments = ({
  comments = [],
  deleteComment = () => {},
  addComment = () => {},
  saveComment = () => {},
  level = 0
}) => {
  return (
    <ul style={{ marginLeft: `${level}rem` }}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <Comment
            value={comment?.value}
            onDelete={() => deleteComment(comment?.id)}
            onAddComment={({ value }) =>
              addComment({ value, pid: comment?.id })
            }
            onSaveComment={({ value }) =>
              saveComment({ value, id: comment?.id })
            }
          />
          {comment?.children && (
            <Comments
              {...{
                deleteComment,
                addComment,
                saveComment,
                level: level + 1,
                comments: comment.children
              }}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Comments;
