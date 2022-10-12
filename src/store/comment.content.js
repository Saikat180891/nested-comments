import { createContext, useState } from "react";

const CommentContext = createContext();

/**
  interface Comment {
    value: string;
    id: number;
    pid: number;
    children: Comment[]
  }
 */

export const id = ((num) => () => num++)(1);

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const updateCommentsRecursively = (commentId, operation = () => {}) => {
    let previousComments = JSON.parse(JSON.stringify(comments));
    function recurse(comments = []) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === commentId) {
          operation(comments, i);
        } else if (comments[i]?.children) {
          recurse(comments[i]?.children);
        }
      }
    }

    recurse(previousComments);
    return previousComments;
  };

  const addComment = (comment) => {
    const { value, pid } = comment;
    if (pid === "root" && value) {
      setComments((previousComments) => [
        ...previousComments,
        { value, id: id(), pid }
      ]);
    } else {
      setComments(() =>
        updateCommentsRecursively(pid, (comments, i) => {
          if (comments[i]?.children) {
            comments[i].children.push({ value, id: id(), pid: comments[i].id });
          } else {
            comments[i].children = [{ value, id: id(), pid: comments[i].id }];
          }
        })
      );
    }
  };

  const deleteComment = (id) => {
    console.log(id);
    setComments(() =>
      updateCommentsRecursively(id, (comments, i) => {
        comments.splice(i, 1);
      })
    );
  };

  const saveComment = (comment) => {
    setComments(() =>
      updateCommentsRecursively(comment.id, (comments, i) => {
        Object.assign(comments[i], { ...comments[i], value: comment.value });
      })
    );
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        addComment,
        deleteComment,
        saveComment
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
export { CommentContext };
