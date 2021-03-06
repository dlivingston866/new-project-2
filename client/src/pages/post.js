import React, { useState, useEffect } from "react";
import axios from "axios";

function Post() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState(localStorage.getItem("id"));

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      window.location = "/";
    }
  }, []);

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
    <div style={{ margin: "0px auto" }}>
      <label>Title</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <br></br>
      <label>Body</label>
      <textarea rows="5" onChange={(e) => setBody(e.target.value)}></textarea>
      <br></br>
      <button className="btn btn-success" onClick={post}>
        Post
      </button>
    </div>
  );
}
export default Post;
