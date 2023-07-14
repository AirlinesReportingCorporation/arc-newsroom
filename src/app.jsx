import { Component } from "react";
import { Stickynav } from "arccorp-vars";
import NewsroomJumbo from "./components/NewsroomJumbo";
import NewsroomCard from "./components/NeswroomCard";
import NewsroomConnect from "./components/NewsroomConnect";

import moment from "moment";
import { motion } from "framer-motion"

class Newsroom extends Component {
  constructor() {
    let maxArray = 6; //temporary max value to make sure it works
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
        date: moment(date).format("MMM YYYY"),
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
    var mediaArray = document.querySelectorAll(".rtf > p");
    let i = 0;
    while (i < 3) {
      const post = mediaArray[i];
      var tempMediaPosts = this.state.mediaPosts;
      tempMediaPosts.push({
        link: post.querySelector("a").getAttribute("href"),
        title: post.querySelector("a").innerText,
        text: post.querySelector("span").innerText,
      });
      console.log(tempMediaPosts);
      i++;
      if (tempMediaPosts.length == 3) {
        break;
      }
    }
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
    return (
      <div className="arc-newsroom-page">
        <Stickynav
          title="Newsroom"
          contactUs="Subscribe"
          links={[
            {
              title: "Newsroom Archive",
              url: "https://www2.arccorp.com/about-us/newsroom/archive/",
            },
            {
              title: "Media Mentions Archive",
              url: "https://www2.arccorp.com/about-us/newsroom/media-mentions/",
            },
            {
              title: "Media Inqueries",
              url: "https://www2.arccorp.com/about-us/newsroom/archive/",
            },
          ]}
        ></Stickynav>
        <motion.div initial={{x: "30vw"}} animate={{x: 0}} transition={{duration: 1}} className="arc-newsroom-top">
          <NewsroomJumbo />
        </motion.div>
        <div className="newsroom-container newsroom-posts-header">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="text-left newsroom-header">Newsroom</h1>
              <p>News Releases</p>
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
              // onClick={this.showMore}
              style={{
                display: this.state.showViewMore ? "inline-block" : "",
                width: "220px",
              }}
              className="ctaBtn newsroom-viewMore"
            >
              View More
            </a>
          </div>
        </div>
        <NewsroomConnect />
        <div className="newsroom-container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="text-left newsroom-sub-header">
                Recent Media Coverage
              </h2>
            </div>
          </div>
          <div className="newsroom-media">
            <div className="row">
              {this.state.mediaPosts.map((post) => (
                <NewsroomCard
                  title={post.title}
                  desc={post.text}
                  link={post.link}
                  titleHeight="120px"
                  maxHeight="280px"
                  innerCardPadding="20px"
                />
              ))}
            </div>
          </div>
          <div className="text-center newsroom-ctaBtn">
            <a
              // onClick={this.showMore}
              style={{
                display: this.state.showViewMore ? "inline-block" : "",
                width: "220px",
              }}
              className="ctaBtn newsroom-viewMore"
            >
              View More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsroom;
