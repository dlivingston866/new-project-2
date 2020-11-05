import React, { useState, useEffect } from "react";
//import logo from "../logo.svg";
import axios from "axios";
import { TagCloud } from "react-tagcloud";
import "./home.css";

function Home() {
  const [cloud, setCloud] = useState([]);
  const data = [
    { value: "JavaScript", count: 38 },
    { value: "React", count: 30 },
    { value: "Nodejs", count: 28 },
    { value: "Express.js", count: 25 },
    { value: "HTML5", count: 33 },
    { value: "MongoDB", count: 18 },
    { value: "CSS3", count: 20 },
  ];
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
        let cloudData = "";

        resp.data.forEach((e) => {
          cloudData += e.title + " " + e.body;
        });

        let cloudArray = cloudData.split(" ");
        console.log(cloudArray);
        let cloudMap = new Map();
        cloudArray.forEach((e) => {
          if (cloudMap.has(e)) {
            cloudMap.set(e, cloudMap.get(e) + 1);
          } else {
            cloudMap.set(e, 1);
          }
        });
        console.log(cloudMap);
        let sortedMap = new Map(
          [...cloudMap.entries()].sort((a, b) => b[1] - a[1])
        );
        console.log(sortedMap);
        let tagData = [];
        let count = 0;
        for (let [key, value] of sortedMap) {
          tagData.push({
            value: key,
            count: value,
          });
        }
        setCloud(tagData.slice(0, 20));
      }
    });
  }, []);
  return (
    <div className="App">
      <h1>Welcome to Blogger</h1>
      <div id="tagcloud">
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={cloud}
          onClick={(tag) => alert(`'${tag.value}' was selected!`)}
        />
      </div>
    </div>
  );
}

export default Home;
