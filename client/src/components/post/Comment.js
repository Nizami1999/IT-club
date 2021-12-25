import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/post";

const Comment = ({
  comment: { _id, user, comment, name, avatar, date },
  postId,
}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClick = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId));
    debugger;
  };
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
        {!auth.loading && auth.isAuthenticated && auth.user._id === user && (
          <button
            type="button"
            onClick={() => onClick(postId, _id)}
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
