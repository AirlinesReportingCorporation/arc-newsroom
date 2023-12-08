import React, { Component } from "react";

class NewsroomJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var jumboPost = [
      {
        date: "Dec 8, 2023",
        title: "ARC Earns Top Score in Human Rights Campaign Foundation’s 2023-2024 Corporate Equality Index",
        text: "Airlines Reporting Corporation (ARC) is proud to announce it received a score of 100 on the Human Rights Campaign Foundation’s 2023-2024 Corporate Equality Index (CEI).",
        link: "/about-us/newsroom/2023-news-releases/arc-earns-top-score-in-HRC-CEI/",
      },
    ];
    return (
      <div className="newsroom-jumbo">
        <div className="row no-gutters jumbo-row">
          {jumboPost.map((jumbo, i) => (
            <div className="col-lg-6" key={i}>
              <a href={"https://www2.arccorp.com" + jumbo.link}>
                <div
                  className="jumbo-left"
                  style={{
                    backgroundImage:
                      "url(https://www2.arccorp.com/globalassets/homepage/redesign/newsroom/newsroom5.jpg",
                  }}
                >
                  <div className="newsroom-jumbo-image"></div>
                </div>
              </a>
            </div>
          ))}
          <div className="col-sm-12 col-lg-6">
            <div className="jumbo-right">
              {jumboPost.map((jumbo, i) => (
                <div className="jumbo-info bg-color-tarmac" key={i}>
                  <div className="jumbo-metadata">
                    <span>{jumbo.date + " "}</span>
                  </div>
                  <div
                    className="newsroom-jumbo-title"
                    style={{
                      color: this.props.color ? this.props.color : "white",
                    }}
                  >
                    <a href={"https://www2.arccorp.com" + jumbo.link}>
                      {jumbo.title}
                    </a>
                  </div>
                  <div className="jumbo-text">{jumbo.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsroomJumbo;
