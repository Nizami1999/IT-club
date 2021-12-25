/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostForm from "./PostForm";
import Posts from "./Posts";

const PostSection = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(text));
    setText("");
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

      <PostForm onSubmit={onSubmit} setText={setText} text={text} />

      <div className="posts">
        <Posts posts={posts} />
      </div>
    </section>
  );
};

export default PostSection;
