import React, { useContext } from "react";
import CommentsView from "./component/Comments";
import AddCommentView from "./component/AddComment";
import CommentProvider, { CommentContext } from "./store/comment.content";
import "./styles.css";

const AddComment = ({ pid = "root" }) => {
  const { addComment } = useContext(CommentContext);
  return (
    <AddCommentView
      onAddComment={(comment) => addComment({ ...comment, pid })}
    />
  );
};

const Comments = () => {
  const { comments, addComment, deleteComment, saveComment } = useContext(
    CommentContext
  );
  return (
    <CommentsView
      {...{ comments, addComment, deleteComment, saveComment, level: 0 }}
    />
  );
};

export default function App() {
  return (
    <CommentProvider>
      <AddComment pid="root" />
      <Comments />
    </CommentProvider>
  );
}
