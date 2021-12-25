import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Comment = ({ post: { comment, name, avatar, date } }) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to="#">
          <img class="round-img" src={avatar} alt={avatar} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{comment}</p>
        <p class="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
      </div>
    </div>
  );
};

export default Comment;
