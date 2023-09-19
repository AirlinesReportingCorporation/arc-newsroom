import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stickynav } from "arccorp-vars";
import "./scss/media.scss";
import Fuse from "fuse.js";

var newsroomLink =
  location.hostname === "localhost" || location.hostname === "netlify"
    ? "/index.html"
    : "https://www2.arccorp.com/about-us/newsroom";

const max = 10;
// Change the pattern

class Archive extends Component {
  constructor() {
    super();
    this.state = {
      newsYear: [],
      newsArray: [],
      expanded: false,
      searchValue: "",
      searchResults: [],
      param: true,
    };
  }

  componentDidMount() {
    this.getMediaPosts();
  }

  setSearchValue = (e) => {
    var value = typeof e === "string" ? e : e.target.value;
    console.log(value);
    const fuse = new Fuse(this.state.newsArray, { keys: ["title"] });
    const searchPattern = value.toString();
    var fuseResults = fuse.search(searchPattern);
    console.log(fuseResults);
    this.setState({ searchResults: fuseResults });
    this.setState({ searchValue: value });
  };

  getMediaPosts = () => {
    var tempNews = [];

    let archivedNews = Array.from(
      document.querySelectorAll(".page-grid .content-block--pageItem")
    );

    for (let i = 0; i < archivedNews.length; i++) {
      const element = archivedNews[i];

      tempNews.push({
        value: element.querySelector("a").innerText,
        name: element.querySelector("a").innerText,
        key: i,
        link: element.querySelector("a").getAttribute("href"),
        title: element.querySelector("a").innerText,
        date: element.querySelector(".content-block--pageItem__metadata")
          .innerText,
      });
    }

    const queryParams = new URLSearchParams(window.location.search);
    const term = queryParams.get("q");

    if (term && this.state.param) {
      const fused = new Fuse(tempNews, { keys: ["title"] });
      const searchPattern = term.toString();
      var fuseResults = fused.search(searchPattern);
      this.setState({ newsArray: tempNews });
      this.setState({ searchResults: fuseResults, searchValue: searchPattern });
    } else {
      this.setState({ newsArray: tempNews });
    }
  };

  showMore = () => {
    this.state.expanded
      ? this.setState({ expanded: false })
      : this.setState({ expanded: true });
  };

  render() {
    return (
      <div className="media-archive-page">
        <Stickynav
          pageLink={newsroomLink}
          className="bg-color-tarmac"
          title="Newsroom"
          stickyCTA="Subscribe to ARC News"
          stickyCTALink="https://www2.arccorp.com/about-us/newsroom/subscribe/"
        ></Stickynav>
        <div className="media-archive-container archive-header">
          <div className="row">
            <div className="col-lg-6">
              <h2>Newsroom Archive</h2>
            </div>
            <div className="col-lg-6">
              <div className="arc-newsroom-search">
                <input
                  id="newsroom-search"
                  value={this.state.searchValue}
                  onChange={this.setSearchValue.bind(this)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="media-archive-container media-archive-posts">
            {(this.state.searchResults.length > 0
              ? this.state.searchResults
              : this.state.newsArray
            ).map((post, i) => {
              var post = this.state.searchResults.length > 0 ? post.item : post;

              if (this.state.expanded) {
                return (
                  <div className="row" key={i}>
                    <div className="col-lg-12">
                      <div className="mention-inner">
                        <div className="mention-tags">
                          NEWS RELEASE <span className="tags-dot">•</span>{" "}
                        </div>
                        <div className="mention-title">
                          <a href={post.link}>{post.title}</a>
                        </div>
                        <div className="mention-date">{post.date}</div>
                      </div>
                    </div>
                  </div>
                );
              } else if (!this.state.expanded && i < max) {
                return (
                  <div className="row" key={i}>
                    <div className="col-lg-12">
                      <div className="mention-inner">
                        <div className="mention-tags">
                          NEWS RELEASE <span className="tags-dot">•</span>{" "}
                        </div>
                        <div className="mention-title">
                          <a href={post.link}>{post.title}</a>
                        </div>
                        <div className="mention-date">{post.date}</div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="media-archive-container">
            <div className="media-archive-button">
              <button className="ctaBtn" onClick={this.showMore}>
                {this.state.expanded ? (
                  <span>View less</span>
                ) : (
                  <span>View more</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Archive;

var mountNode = document.getElementById("app");

ReactDOM.render(<Archive />, mountNode);
