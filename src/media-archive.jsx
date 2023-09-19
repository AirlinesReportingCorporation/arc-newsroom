import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Stickynav } from "arccorp-vars";
import Fuse from "fuse.js";
import "./scss/media.scss";

var newsroomLink =
  location.hostname === "localhost" || location.hostname === "netlify"
    ? "/index.html"
    : "https://www2.arccorp.com/about-us/newsroom";
class MediaArchive extends Component {
  constructor() {
    super();
    this.state = {
      // array for the years
      mediaYear: [],
      // array of objects for each year's post
      mediaArray: [],
      searchValue: "",
      searchResults: [],
      expanded: false,
    };
  }

  componentDidMount() {
    this.getMediaPosts();
  }

  setSearchValue = (e) => {
    var value = typeof e === "string" ? e : e.target.value;
    var tempResults = [];
    console.log(value);
    console.log(this.state.mediaArray);

    //concat arrays
    for (let i = 0; i < this.state.mediaArray.length; i++) {
      const arr = this.state.mediaArray[i];
      const fuse = new Fuse(arr, { keys: ["title"] });
      const searchPattern = value.toString();
      var fuseResults = fuse.search(searchPattern);
      console.log(fuseResults);
      tempResults[i] = fuseResults;
    }

    console.log(tempResults);

    this.setState({ searchResults: tempResults });
    this.setState({ searchValue: value });
  };

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
              <h2>Media Mentions Archive</h2>
            </div>
            <div className="col-lg-6">
              <div className="arc-newsroom-search">
                <input
                  id="newsroom-search"
                  placeholder="Search"
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
            {(this.state.searchValue.length > 0
              ? this.state.searchResults
              : this.state.mediaArray
            ).map((postYear, i) => {
              // if the show more button hasn't been push
              if (!this.state.expanded) {
                // Use the index of the postYear to paginate only the most recent year
                if (i < 1) {
                  return postYear.map((post) => {
                    var post =
                      this.state.searchValue.length > 0 ? post.item : post;
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
                }
              }
              // Else, when we want to view more
              else {
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
              }
            })}
          </div>
          <div className="media-archive-container">
            <div className="media-archive-button">
              <button className="ctaBtn" onClick={this.showMore}>
                {console.log(this.state.expanded)}
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

export default MediaArchive;

var mountNode = document.getElementById("app");

ReactDOM.render(<MediaArchive />, mountNode);
