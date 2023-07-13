import { Component } from "react";

export default class NewsroomJumbo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var jumboPost = [
      {
        icon: "arc-is-ndc-ready",
        timeread: "2 min read",
        title: "April U.S. Travel Agency Air Ticket Sales Total $8.7 Billion",
        text: "Average monthly ticket price falls below year-over-year levels for the first time since 2021",
        link: "/newsroom/2023-news-releases/april-2023-ticket-sales/",
        date: "April 2023",
      },
    ];
    return (
      <div className="newsroom-jumbo">
        <div className="row no-gutters jumbo-row">
          {jumboPost.map((jumbo) => (
            <div className="col-lg-4">
              <a href={"https://www2.arccorp.com" + jumbo.link}>
                <div
                  className="jumbo-left"
                  style={{
                    backgroundImage:
                      "url(https://www2.arccorp.com/globalassets/homepage/redesign/latest/" +
                      jumbo.icon +
                      ".jpg)",
                  }}
                ></div>
              </a>
            </div>
          ))}
          <div className="col-lg">
            <div className="jumbo-right">
              {jumboPost.map((jumbo) => (
                <div className="jumbo-info">
                  <div className="jumbo-metadata">
                    {jumbo.date}{" "}
                    <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                      •
                    </span>{" "}
                    {jumbo.timeread}
                  </div>
                  <div
                    className="newsroom-jumbo-title"
                    style={{
                      color: this.props.color ? this.props.color : "black",
                    }}
                  >
                    <a href={"https://www2.arccorp.com" + jumbo.link}>
                      {jumbo.title}
                    </a>
                  </div>
                  <div className="jumbo-text">{jumbo.text}</div>
                  <div>
                    <a href={"https://www2.arccorp.com" + jumbo.link}>
                      Read More{" "}
                      <i
                        className="fas fa-chevron-right"
                        style={{ fontSize: "11px", marginLeft: "5px" }}
                      ></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
