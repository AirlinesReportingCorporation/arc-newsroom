import React, { Component } from "react";

class NewsroomJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var jumboPost = [
      {
        icon: "arc-is-ndc-ready",
        date: "AUG 17, 2023",
        timeread: "1 min read",
        title: "July U.S. Travel Agency Air Ticket Sales Increase 11% Year Over Year",
        text: "Month-over-Month Growth in U.S. Domestic Passenger Trips Outpaced International in July",
        link: "/about-us/newsroom/2023-news-releases/july-2023-ticket-sales/",
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
                      "url(https://www2.arccorp.com/globalassets/homepage//redesign/newsroom/newsroom-jumbo.png",
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
