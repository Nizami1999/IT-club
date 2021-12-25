import React from "react";
import { Link } from "react-router-dom";

const PostItemTop = ({ post: { name, text, avatar } }) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to="#">
          <img class="round-img" src={avatar} alt={avatar} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{text}</p>
      </div>
    </div>
  );
};

export default PostItemTop;
