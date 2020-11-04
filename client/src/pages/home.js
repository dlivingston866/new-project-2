import React, { useState, useEffect } from "react";
//import logo from "../logo.svg";
import axios from "axios";
import "./home.css";

function Home() {
  const [cloud, setCloud] = useState(null);
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
      if (Array.isArray(resp.data)) {
        let cloudData = resp.data.reduce((a, b) => {
          return a.title + " " + b.title + " " + a.body + " " + b.body;
        });
        axios({
          method: "GET",
          withCredentials: true,
          url: "https://quickchart.io/wordcloud?text=" + cloudData,
        }).then((res) => {
          console.log(res);
          setCloud(res);
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <h1>Welcome to Blogger</h1>
    </div>
  );
}

export default Home;
