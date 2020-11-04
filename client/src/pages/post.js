import React, { useState } from "react";
import axios from "axios";

function Post() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState(localStorage.getItem("id"));

  const post = () => {
    axios({
      method: "POST",
      data: {
        title: title,
        body: body,
        user: user,
        date: new Date(),
      },
      withCredentials: true,
      url: "/post",
    }).then((res) => {
      axios({
        method: "GET",

        withCredentials: true,
        url: "/posts",
      }).then((resp) => {
        console.log(resp);
      });
      console.log(res);
    });
  };

  return (
    <div>
      <label>Title</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <label>Body</label>
      <textarea rows="5" onChange={(e) => setBody(e.target.value)}></textarea>
      <button onClick={post}>Post</button>
    </div>
  );
}
export default Post;
