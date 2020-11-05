import React, { useState, useEffect } from "react";
import axios from "axios";
import "./notes.scss";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      window.location = "/";
    }

    axios({
      method: "GET",

      withCredentials: true,
      url: "/posts/" + localStorage.getItem("id"),
    }).then((resp) => {
      console.log(resp);
      setNotes(resp.data);
    });
  }, []);

  return (
    <div>
      <div id="page_notes" data-role="page">
        <div data-role="header">
          <h2>Your notes</h2>
          {notes.map((post) => (
            <div className="card blogcard">
              <div className="card-header">{post.title}</div>
              <div>{post.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
