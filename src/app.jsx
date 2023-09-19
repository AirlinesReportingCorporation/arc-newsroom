import React, { Component } from "react";
import { Stickynav } from "arccorp-vars";
import NewsroomCard from "./components/NeswroomCard";
import NewsroomConnect from "./components/NewsroomConnect";
import NewsroomJumbo from "./components/NewsroomJumbo";
import moment from "moment";

import SelectSearch, { fuzzySearch } from "react-select-search";

class Newsroom extends Component {
  constructor() {
    let maxArray = 8; //temporary max value to make sure it works
    super();
    this.state = {
      posts: [],
      searchPosts: [],
      curIndex: maxArray,
      prevIndex: 0,
      tempIndexHolder: 0,
      showViewMore: false,
      mediaPosts: [],
      searchValue: "",
    };
  }

  componentDidMount() {
    this.getPosts(this.state.prevIndex, this.state.curIndex);
    this.getMediaPosts();
  }

  setSearchValue = (val) => {
    console.log(val);
    this.setState({ searchValue: val });
  };

  getPosts = (startIndex, endIndex) => {
    var postArray = document.querySelectorAll(
      ".content-block--pageItem__inside"
    );
    let i = startIndex;
    while (i < endIndex) {
      const post = postArray[i];
      var tempPosts = this.state.posts;
      var tempSearchPosts = this.state.searchPosts;

      let date = post.querySelector(".content-block--pageItem__metadata")
        .lastElementChild.innerHTML;

      tempPosts.push({
        link: post.querySelector(".ctaLink").getAttribute("href"),
        title: post.querySelector(".ctaLink").innerText,
        date: moment(date).format("MMM DD, YYYY"),
        text: post.querySelector(".content-block--pageItem__body").innerText,
      });

      i++;
      if (tempPosts.length == endIndex) {
        break;
      }
    }

    for (let i = 0; i < postArray.length; i++) {
      const post = postArray[i];
      tempSearchPosts.push({
        name: post.querySelector(".ctaLink").innerText,
        value:
          post.querySelector(".ctaLink").innerText +
          " " +
          post.querySelector(".content-block--pageItem__body").innerText,
      });
    }
    console.log(tempSearchPosts);

    // check if done looping full post array, set condition
    if (i == postArray.length) {
      // this.setState({ showViewMore: false });
      console.log("Data full");
    } else {
      // this.setState({ showViewMore: true });
      console.log("Data loaded");
    }

    this.setState({ posts: tempPosts });
    this.setState({ searchPosts: tempSearchPosts });
  };

  getMediaPosts = () => {
    let tempArray = Array.from(document.querySelectorAll(".rtf > p"));
    let mediaArray = [];
    let i = 0;

    while (i < 8) {
      const post = tempArray[i];

      var tempMediaPosts = this.state.mediaPosts;
      tempMediaPosts.push({
        link: post.querySelector("a").getAttribute("href"),
        title: post.querySelector("a").innerText,
        text: post.innerText.replace(post.querySelector("a").innerText, ""),
        image:
          "https://www2.arccorp.com/globalassets/homepage/redesign/newsroom/newsroom" +
          ((post.querySelector("a").innerText.length % 7) + 1) +
          ".jpg",
      });
      i++;
      if (tempMediaPosts.length == 8) {
        break;
      }
    }

    // check if done looping full post array, set condition
    if (i == mediaArray.length) {
      // this.setState({ showViewMore: false });
      console.log("Data full");
    } else {
      // this.setState({ showViewMore: true });
      console.log("Data loaded");
    }

    this.setState({ mediaPosts: tempMediaPosts });
  };

  showMore = () => {
    var tempIndex = this.state.curIndex;
    this.setState(
      { prevIndex: tempIndex, curIndex: (tempIndex += arrayMax) },
      () => {
        this.getPosts(this.state.prevIndex, this.state.curIndex);
      }
    );
  };

  render() {
    let recentMedia = this.state.mediaPosts.slice(0, 3);
    return (
      <div className="arc-newsroom-page">
        <Stickynav
          className="bg-color-tarmac"
          title="Newsroom"
          stickyCTA="Subscribe to ARC News"
          stickyCTALink="https://www2.arccorp.com/about-us/newsroom/subscribe/"
        ></Stickynav>
        <NewsroomJumbo />
        <div className="newsroom-container newsroom-posts-header">
          <div className="row">
            <div className="col-lg-6">
              <h2>News Releases</h2>
            </div>
            <div className="col-lg-6">
              <div className="arc-newsroom-search">
                <form
                  action={
                    location.hostname === "localhost" ||
                    location.hostname.indexOf("netlify") > -1
                      ? "/archive.html"
                      : "https://www2.arccorp.com/about-us/newsroom/archive/"
                  }
                >
                  <input
                    placeholder="Search"
                    type="text"
                    name="q"
                    id="newsroom-search"
                  />
                  <i class="fas fa-search"></i>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="newsroom-posts">
          <div className="newsroom-container">
            <div className="row">
              {this.state.posts.map((post, i) => (
                <NewsroomCard
                  key={i}
                  date={post.date}
                  title={post.title}
                  desc={post.text}
                  link={post.link}
                />
              ))}
            </div>
          </div>
          <div className="text-center newsroom-ctaBtn">
            <a
              href={
                location.hostname === "localhost" ||
                location.hostname.indexOf("netlify") > -1
                  ? "/archive.html"
                  : "https://www2.arccorp.com/about-us/newsroom/archive/"
              }
              style={{
                display: this.state.showViewMore ? "inline-block" : "",
                width: "220px",
              }}
              className="ctaBtn newsroom-viewMore"
            >
              News Release Archive
            </a>
          </div>
        </div>
        <div className="newsroom-container newsroom-posts-header">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="text-left">Recent Media Coverage</h2>
            </div>
          </div>
          <div className="newsroom-media">
            <div className="row">
              {recentMedia.splice(0, 1).map((post, i) => (
                <div className="col-lg-12" key={i}>
                  <a href={post.link}>
                    <div
                      className="card-background"
                      style={{
                        background:
                          "url(" + post.image + ") center center no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="recent-inner">
                        <div className="recent-title">{post.title}</div>
                        <div className="recent-company">{post.text}</div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
              {recentMedia.splice(0, 2).map((post, i) => (
                <div className="col-lg-6" key={i}>
                  <a href={post.link}>
                    <div
                      className="card-background"
                      style={{
                        background:
                          "url(" + post.image + ") center center no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="newsroom-card-overlay"></div>
                      <div className="recent-inner">
                        <div className="recent-title">{post.title}</div>
                        <div className="recent-company">{post.text}</div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center newsroom-ctaBtn">
            <a
              href={
                location.hostname === "localhost" ||
                location.hostname.indexOf("netlify") > -1
                  ? "/media-archive.html"
                  : "https://www2.arccorp.com/about-us/newsroom/media-mentions/"
              }
              // onClick={this.showMore}
              style={{
                width: "243px",
              }}
              className="ctaBtn newsroom-viewMore"
            >
              Media Mentions Archive
            </a>
          </div>
        </div>
        <NewsroomConnect />
      </div>
    );
  }
}

export default Newsroom;
