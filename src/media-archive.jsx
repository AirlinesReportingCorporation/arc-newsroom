import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { Stickynav } from "arccorp-vars";
import "./scss/media.scss";

export default class MediaArchive extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("media archive");
    this.getMediaPosts();
  }

  //   All of the Archive Mentions
  //let archivedMedia = Array.from(document.querySelectorAll(".rtf > #archive")[0].children)

  // All Current Mentions
  //let tempArray = Array.from(document.querySelectorAll(".rtf > *"));
  // Grabs the index of the div that holds the archive (since we only want the p tags before)
  //let archiveIndex = tempArray.findIndex(item => item.localName === "div");
  // return only the h2 and the p tags before the archive div
  // tempArray.splice(0, archiveIndex)

  getMediaPosts = () => {
    let archivedMedia = Array.from(
      document.querySelectorAll(".rtf > #archive")[0].children
    );
    let tempArray = Array.from(document.querySelectorAll(".rtf > *"));

    let archiveIndex = tempArray.findIndex((item) => item.localName === "div");
    let currentMedia = tempArray.splice(0, archiveIndex);

    let combined = currentMedia.concat(archivedMedia);

    // array for the years
    let mediaYear = [];
    // array of objects for each year's post
    let mediaArray = [];
    // temp array to hold the array of objects
    let tempMedia = [];

    for (let i = 0; i < combined.length; i++) {
      if (combined[i].localName == "h2") {
        mediaYear.push(combined[i].innerText);
        if (tempMedia.length > 0) {
          mediaArray.push(tempMedia);
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
    mediaArray.push(tempMedia);
    // while (i < currentMedia.length || i < archivedMedia.length) {
    //     if (h2 in currentMedia || h2 in archivedMedia) {
    //         console.log(h2)
    //     }
    //   const post = tempArray[i];
    //   console.log(post);
    //   var tempMediaPosts = this.state.mediaPosts;
    //   tempMediaPosts.push({
    //     link: post.querySelector("a").getAttribute("href"),
    //     title: post.querySelector("a").innerText,
    //     text: post.innerText.replace(post.querySelector("a").innerText, ""),
    //   });
    //   i++;
    //   if (tempMediaPosts.length == 8) {
    //     break;
    //   }
    // }
    // console.log("Temp post");
    // console.log(tempMediaPosts);
    // console.log(mediaArray.length + " : media length");
    // console.log(i == mediaArray.length);
    // // check if done looping full post array, set condition
    // if (i == mediaArray.length) {
    //   // this.setState({ showViewMore: false });
    //   console.log("Data full");
    // } else {
    //   // this.setState({ showViewMore: true });
    //   console.log("Data loaded");
    //}
    // console.log(tempMediaPosts);
    // this.setState({ mediaPosts: tempMediaPosts });
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
         <div className="row">
            <div className="col-lg-6">
              <h2>Media Mentions Archive</h2>
            </div>
            <div className="col-lg-6">
              <div className="arc-newsroom-search">
                search bar here
              </div>
            </div>
          </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(<MediaArchive />);
