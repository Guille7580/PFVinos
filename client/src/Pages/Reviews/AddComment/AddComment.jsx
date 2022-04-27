import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../../actions/comments";

const AddComment = () => {
  const user = useSelector((state) => state.loginReducer.userDetail);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const { id } = useSelector((state) => state.detailProductReducer.product);

  const handleSend = () => {
    dispatch(
      postComment({
        productId: id,
        user: user.usuario,
        content: message,
        score: 0,
      })
    );
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="input-form">
      <form className="form">
        <textarea
          value={message}
          onChange={handleInput}
          className="input"
          placeholder="Enter a comment..."
        ></textarea>
      </form>
      <div className="input__footer">
        <img src={user.avatar} alt={user.nombre} />
        <button className="send-btn" onClick={() => handleSend()}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default AddComment;