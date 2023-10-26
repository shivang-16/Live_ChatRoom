import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Register.scss";

let user;

const handleSend = () => {
  user = document.getElementById("userName").value;
  document.getElementById("userName").value = "";
};
const Register = () => {
  const [name, setName] = useState("");

  return (
    <>
      <div className="register-box">
        <div className="header">
          <img
            src="https://www.freeiconspng.com/thumbs/live-chat-icon/live-chat-icon-0.png"
            alt=""
          />
          <h4>
            Join our lively chatroom! Share this link to freinds and make it
            your own chatroom.
          </h4>
        </div>
        <form className="content">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="userName"
          />
          <Link to={"/chat"}>
            <button onClick={handleSend} type="submit">
              Continue to Chat
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
export { user };
