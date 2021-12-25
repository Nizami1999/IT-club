import React from "react";
import Comment from "./Comment";

const Comments = ({ post }) => {
  return (
    <div class="comments">
      {post.comments.length > 0 &&
        post.comments.map((post) => <Comment key={post._id} post={post} />)}
    </div>
  );
};

export default Comments;
