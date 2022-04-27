import "./comment.css";
import "./replies.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { putComment, deleteComment } from "../../../actions/comments";
import ReplyBox from "../../Reviews/ReplyBox/Reply";
import Reply from "./Reply";
import moment from "moment";

const Comment = ({ comment }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [score, setScore] = useState(comment.score);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(comment.content);
  const [editing, setEditing] = useState(false);

  const handleEditingChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const enableEditing = () => {
    setEditing(true);
  };

  const handlePlus = async () => {
    const newScore = score + 1;
    dispatch(putComment({ ...comment, score: newScore }));
    setScore(newScore);
  };

  const handleMinus = async () => {
    const newScore = score - 1;
    dispatch(putComment({ ...comment, score: newScore }));
    setScore(newScore);
  };

  const toggleReply = () => {
    setShowReplyBox(!showReplyBox);
  };

  const handleUpdate = () => {
    dispatch(putComment({ ...comment, content: currentMessage }));
    setEditing(false);
  };

  const handleDelete = async () => {
    dispatch(deleteComment(comment));
  };

  return (
    <div className="comment-reply-container">
      <div className="comment">
        <div className="comment__header">
          <img src={comment.user.image} alt="" />
          <p className="comment__username">{comment.user.username}</p>
          {user.user.username === comment.user.username && <span>you</span>}
          <p>{moment(comment.createdAt).fromNow()}</p>
        </div>
        <div className="comment__content">
          {editing ? (
            <textarea
              className="replybox"
              value={currentMessage}
              onChange={handleEditingChange}
            ></textarea>
          ) : (
            <p>{comment.content}</p>
          )}
        </div>
        <div className="comment__footer">
          <div className="score">
            <button
              className="score__plus"
              onClick={() => {
                handlePlus();
              }}
            >
              <img src="./images/icon-plus.svg" alt="plus" />
            </button>
            <p className="score__amount">{score}</p>
            <button
              className="score__minus"
              onClick={() => {
                handleMinus();
              }}
            >
              <img
                src="./images/icon-minus.svg"
                alt="minus"
                className="score__minus"
              />
            </button>
          </div>
          {user.user.username === comment.user.username ? (
            <div className="user-buttons">
              {editing ? (
                <div className="update-button">
                  <button onClick={handleUpdate} className="update-btn">
                    Update
                  </button>
                </div>
              ) : (
                <>
                  <div className="delete-button">
                    <button
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      <img src="./images/icon-delete.svg" alt="" />
                      Delete
                    </button>
                  </div>

                  <div className="edit-button">
                    <button onClick={() => enableEditing()}>
                      <img src="./images/icon-edit.svg" alt="" />
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="reply-button">
              <button onClick={() => toggleReply()}>
                <img src="./images/icon-reply.svg" alt="" />
                Reply
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="replies">
        {comment.replies.map((reply) => (
          <Reply comment={comment} reply={reply} key={reply._id} />
        ))}
      </div>
      {showReplyBox && <ReplyBox comment={comment} />}
    </div>
  );
};

export default Comment;