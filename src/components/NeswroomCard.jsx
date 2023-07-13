import { Component } from "react";

export default class NewsroomCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={
          this.props.size
            ? this.props.size
            : "col-xs-12 col-sm-6 col-md-4 newsroom-columns"
        }
      >
        <div className="post-outer-card" style={{maxHeight: this.props.maxHeight? this.props.maxHeight: "375px"}}>
          <div className="post-top-rectangle"></div>
          <div className="post-inner-card" style={{padding: this.props.innerCardPadding ? this.props.innerCardPadding + " 25px" : "40px 25px"}}>
            {this.props.date? <div className="post-metadata">{this.props.date}</div> :""}
            <div className="post-title" style={{height: this.props.titleHeight? this.props.titleHeight: "auto"}}>{this.props.title}</div>
            <div className="post-desc">{this.props.desc}</div>
            <div className="post-cta">
              <a
                href={
                  "https://www2.arccorp.com/about-us/newsroom/2023-news-releases/" +
                  this.props.link
                }
              >
                Read More
                <i
                  className="fas fa-chevron-right"
                  style={{ fontSize: "11px", marginLeft: "5px" }}
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
