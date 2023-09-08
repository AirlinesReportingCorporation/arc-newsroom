import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stickynav } from "arccorp-vars";
import "./scss/media.scss";

class MediaArchive extends Component {
  constructor() {
    super();
    this.state = {
      // array for the years
      mediaYear: [],
      // array of objects for each year's post
      mediaArray: [],
    };
  }

  componentDidMount() {
    this.getMediaPosts();
  }

  getMediaPosts = () => {
    let archivedMedia = Array.from(
      document.querySelectorAll(".rtf > #archive")[0].children
    );
    let tempArray = Array.from(document.querySelectorAll(".rtf > *"));

    let archiveIndex = tempArray.findIndex((item) => item.localName === "div");
    let currentMedia = tempArray.splice(0, archiveIndex);

    let combined = currentMedia.concat(archivedMedia);

    //temp array to hold the tempmedia array dumps;
    let tempMediaArray = [];
    // temp array to hold the array of objects
    let tempMedia = [];

    for (let i = 0; i < combined.length; i++) {
      if (combined[i].localName == "h2") {
        this.state.mediaYear.push(combined[i].innerText);
        if (tempMedia.length > 0) {
          tempMediaArray.push(tempMedia);
          tempMedia = [];
        }
      }
      if (combined[i].localName == "p") {
        tempMedia.push({
          link: combined[i].querySelector("a").getAttribute("href"),
          title: combined[i].querySelector("a").innerText,
          text: combined[i].innerText.replace(
            combined[i].querySelector("a").innerText,
            ""
          ),
        });
      }
    }
    tempMediaArray.push(tempMedia);
    this.setState({ mediaArray: tempMediaArray });
  };

  render() {
    return (
      <div className="media-archive-page">
        <Stickynav
          className="bg-color-tarmac"
          title="Newsroom"
          contactUs="Subscribe to ARC News"
          rightLink="https://www2.arccorp.com/about-us/newsroom/subscribe/"
        ></Stickynav>
        <div className="media-archive-container archive-header">
          <div className="row">
            <div className="col-lg-6">
              <h2>Media Mentions Archive</h2>
            </div>
            <div className="col-lg-6">
              <div className="arc-newsroom-search">search bar here</div>
            </div>
          </div>
        </div>
        <div></div>
        <div>
          <div className="media-archive-container">
            {this.state.mediaArray.map((postYear, i) => {
              return postYear.map((post) => {
                return (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="mention-inner">
                        <div className="mention-tags">
                          MEDIA MENTIONS <span className="tags-dot">•</span>{" "}
                          {post.text}
                        </div>
                        <div className="mention-title">
                          <a href={post.link}>{post.title}</a>
                        </div>
                        <div className="mention-date">
                          {post.date ? post.date : this.state.mediaYear[i]}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MediaArchive;

var mountNode = document.getElementById("app");

ReactDOM.render(<MediaArchive />, mountNode);
