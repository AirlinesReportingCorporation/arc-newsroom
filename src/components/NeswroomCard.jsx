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
            : "col-xs-12 col-sm-6 col-md-4 col-lg-3 newsroom-columns"
        }
      >
        <div className="post-outer-card">
          <a href={"https://www2.arccorp.com/" + this.props.link} className="post-link">
            <div className="post-inner-top">
              <div className="post-title">{this.props.title}</div>
              <div className="post-desc">{this.props.desc}</div>
            </div>
            <div className="post-inner-bottom">
              <div className="post-cta">
                <span>{this.props.date}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}
