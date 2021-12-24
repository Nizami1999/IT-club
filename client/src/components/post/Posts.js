/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import Post from "./Post";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(text));
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return loading || posts === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <ToastContainer />
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="posts">
        {posts.length > 0 &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </section>
  );
};

export default Posts;
