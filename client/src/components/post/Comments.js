import React from "react";
import Comment from "./Comment";

const Comments = ({ post }) => {
  return (
    <div class="comments">
      {post.comments.length > 0 &&
        post.comments.map((comment) => (
          <Comment key={post._id} comment={comment} postId={post._id} />
        ))}
    </div>
  );
};

export default Comments;
