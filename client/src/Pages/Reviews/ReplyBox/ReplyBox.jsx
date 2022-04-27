import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putComment } from "../../../actions/comments";

import "./replybox.css";

const ReplyBox = ({ comment }) => {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handleReply = () => {
    comment.replies.push({
      user: user.user,
      content: message,
      replyingTo: comment.user.username,
    });
    dispatch(putComment(comment));
  };

  return (
    <div className="replybox">
      <form className="form">
        <textarea
          value={message}
          onChange={handleInput}
          className="input"
          placeholder="Enter a reply..."
        ></textarea>
      </form>
      <div className="input__footer">
        <img src={user.user.image} alt={user.user.username} />
        <button onClick={handleReply} className="reply-btn">
          Reply
        </button>
      </div>
    </div>
  );
};

export default ReplyBox;