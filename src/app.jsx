import { Component } from "react";
import { Stickynav } from "arccorp-vars";

class Newsroom extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      curIndex: 8,
      prevIndex: 0,
      tempIndexHolder: 0,
      showViewMore: false,
    };
  }

  // getPosts = (startIndex, endIndex) => {
  //   var postArray = document.querySelectorAll(
  //     ".content-block--pageItem__inside"
  //   );
  //   let i = startIndex;
  //   while (i < endIndex) {
  //     const post = postArray[i];
  //     var tempPosts = this.state.posts;
  //     tempPosts.push({
  //       link: post.querySelector(".ctaLink").getAttribute("href"),
  //       title: post.querySelector(".ctaLink").getAttribute("title"),
  //       date: post.querySelector(".content-block--pageItem__metadata")
  //         .lastElementChild.innerHTML,
  //       text: post.querySelector(".content-block--pageItem__body").innerText,
  //     });
  //     i++;
  //     if (tempPosts.length == endIndex) {
  //       break;
  //     }
  //   }
  //   console.log(i == postArray.length);
  //   // check if done looping full post array, set condition
  //   if (i == postArray.length) {
  //     this.setState({ showViewMore: false });
  //   } else {
  //     this.setState({ showViewMore: true });
  //   }
  //   console.log(tempPosts);
  //   this.setState({ posts: tempPosts });
  // };

  // showMore = () => {
  //   var tempIndex = this.state.curIndex;
  //   this.setState(
  //     { prevIndex: tempIndex, curIndex: (tempIndex += arrayMax) },
  //     () => {
  //       this.getPosts(this.state.prevIndex, this.state.curIndex);
  //     }
  //   );
  // };

  render() {
    return (
      <div className="arc-newsroom-page">
        <Stickynav title="Newsroom"></Stickynav>
        <div className="arc-newsroom-top">
          Jumbo here
        </div>
        <div className="newsroom-container newsroom-posts-header">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="text-left newsroom-header">Newsroom</h2>
              <p>News Releases</p>
            </div>
          </div>
        </div>
        <div className="newsroom-posts">
          <div className="newsroom-container">
            <div className="row">
             Newsroom posts here
            </div>
          </div>
          <div className="text-center newsroom-ctaBtn">
            <a
              onClick={this.showMore}
              style={{
                display: this.state.showViewMore ? "inline-block" : "none",
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
