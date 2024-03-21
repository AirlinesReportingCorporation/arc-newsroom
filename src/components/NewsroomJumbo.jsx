import React, { Component } from "react";

class NewsroomJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var jumboPost = [
      {
        date: "Mar 20, 2024",
        title: "U.S. Travel Agencies Air Ticket Sales Reach $8.9 Billion in February 2024",
        text: "Strong Domestic Travel Demand Elevated Sales to Another Record Month",
        link: "/about-us/newsroom/2024-news-releases/u.s.-travel-agencies-air-ticket-sales-reach-$8.9-billion-in-february-2024",
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
                      "url(https://www2.arccorp.com/globalassets/homepage/redesign/newsroom/newsroom2.jpg",
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
