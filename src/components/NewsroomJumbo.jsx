import React, { Component } from "react";

class NewsroomJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var jumboPost = [
      {
        date: "OCT 18, 2023",
        title: "September U.S. Travel Agency Air Ticket Sales Total $7.6 Billion",
        text: "Month-over-Month Sales and Passenger Trips Declined as Summer Air Travel Wound Down",
        link: "/about-us/newsroom/2023-news-releases/september-u.s.-travel-agency-air-ticket-sales-total-$7.6-billion/",
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
                      "url(https://www2.arccorp.com/globalassets/homepage/redesign/newsroom/newsroom1.jpg",
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
