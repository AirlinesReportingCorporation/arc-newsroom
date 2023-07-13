import { Component } from "react";
import { Stickynav } from "arccorp-vars";
import NewsroomJumbo from "./components/NewsroomJumbo";
import NewsroomCard from "./components/NeswroomCard";

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
    };
  }
  

  componentDidMount() {
    this.getPosts(this.state.prevIndex, this.state.curIndex);
  }

  getPosts = (startIndex, endIndex) => {
    var postArray = document.querySelectorAll(
      ".content-block--pageItem__inside"
    );
    let i = startIndex;
    while (i < endIndex) {
      const post = postArray[i];
      var tempPosts = this.state.posts;
      tempPosts.push({
        link: post.querySelector(".ctaLink").getAttribute("href"),
        title: post.querySelector(".ctaLink").innerText,
        date: post.querySelector(".content-block--pageItem__metadata")
          .lastElementChild.innerHTML,
        text: post.querySelector(".content-block--pageItem__body").innerText,
      });
      console.log(tempPosts)
      i++;
      if (tempPosts.length == endIndex) {
        break;
      }
    }
    console.log(i == postArray.length);
    // check if done looping full post array, set condition
    if (i == postArray.length) {
      // this.setState({ showViewMore: false });
      console.log("Data full")
    } else {
      // this.setState({ showViewMore: true });
      console.log("Data loaded")
    }
    console.log(tempPosts);
    this.setState({ posts: tempPosts });
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
        <div className="arc-newsroom-top">
          <NewsroomJumbo />
        </div>
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
      </div>
    );
  }
}

export default Newsroom;
