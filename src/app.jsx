import { Component } from "react";
import { Stickynav } from "arccorp-vars";
import NewsroomCard from "./components/NeswroomCard";
import NewsroomConnect from "./components/NewsroomConnect";
import NewsroomJumbo from "./components/NewsroomJumbo";
import moment from "moment";

class Newsroom extends Component {
  constructor() {
    let maxArray = 8; //temporary max value to make sure it works
    super();
    this.state = {
      posts: [],
      curIndex: maxArray,
      prevIndex: 0,
      tempIndexHolder: 0,
      showViewMore: false,
      mediaPosts: [],
    };
  }

  componentDidMount() {
    this.getPosts(this.state.prevIndex, this.state.curIndex);
    this.getMediaPosts();
  }

  getPosts = (startIndex, endIndex) => {
    var postArray = document.querySelectorAll(
      ".content-block--pageItem__inside"
    );
    let i = startIndex;
    while (i < endIndex) {
      const post = postArray[i];
      var tempPosts = this.state.posts;
      let date = post.querySelector(".content-block--pageItem__metadata")
        .lastElementChild.innerHTML;
      tempPosts.push({
        link: post.querySelector(".ctaLink").getAttribute("href"),
        title: post.querySelector(".ctaLink").innerText,
        date: moment(date).format("MMM DD, YYYY"),
        text: post.querySelector(".content-block--pageItem__body").innerText,
      });
      console.log(tempPosts);
      i++;
      if (tempPosts.length == endIndex) {
        break;
      }
    }
    console.log(i == postArray.length);
    // check if done looping full post array, set condition
    if (i == postArray.length) {
      // this.setState({ showViewMore: false });
      console.log("Data full");
    } else {
      // this.setState({ showViewMore: true });
      console.log("Data loaded");
    }
    console.log(tempPosts);
    this.setState({ posts: tempPosts });
  };

  getMediaPosts = () => {
    let tempArray = Array.from(document.querySelectorAll(".rtf > p"));
    let mediaArray = [];
    let i = 0;
    console.log(tempArray);
    while (i < 8) {
      const post = tempArray[i];
      console.log(post);
      var tempMediaPosts = this.state.mediaPosts;
      tempMediaPosts.push({
        link: post.querySelector("a").getAttribute("href"),
        title: post.querySelector("a").innerText,
        text: post.innerText.replace(post.querySelector("a").innerText, ""),
      });
      i++;
      if (tempMediaPosts.length == 8) {
        break;
      }
    }
    console.log("Temp post");
    console.log(tempMediaPosts);
    console.log(mediaArray.length + " : media length");
    console.log(i == mediaArray.length);
    // check if done looping full post array, set condition
    if (i == mediaArray.length) {
      // this.setState({ showViewMore: false });
      console.log("Data full");
    } else {
      // this.setState({ showViewMore: true });
      console.log("Data loaded");
    }
    console.log(tempMediaPosts);
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
          contactUs="Subscribe to ARC News"
          rightLink="https://www2.arccorp.com/about-us/newsroom/subscribe/"
        ></Stickynav>
        <NewsroomJumbo />
        <div className="newsroom-container newsroom-posts-header">
          <div className="row">
            <div className="col-lg-6">
              <h2>News Releases</h2>
            </div>
            <div className="col-lg-6">
              <div className="arc-newsroom-search">
                search bar here
              </div>
            </div>
          </div>
        </div>
        <div className="newsroom-posts">
          <div className="newsroom-container">
            <div className="row">
              {this.state.posts.map((post) => (
                <NewsroomCard
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
            href="https://www2.arccorp.com/about-us/newsroom/archive/"
              // onClick={this.showMore}
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
              {recentMedia.splice(0, 1).map((post) => (
                <div className="col-lg-12">
                  <a href={post.link}>
                    <div className="card-background">
                      <div className="recent-inner">
                        <div className="recent-title">{post.title}</div>
                        <div className="recent-company">{post.text}</div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
              {recentMedia.splice(0, 2).map((post) => (
                <div className="col-lg-6">
                  <a href={post.link}>
                    <div className="card-background">
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
            href="https://www2.arccorp.com/about-us/newsroom/media-mentions/"
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
