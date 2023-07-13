import React from "react";

export default function NewsroomConnect() {
  return (
    <div className="newsroom-connect-outer">
      <div className="newsroom-connect-inner">
        <div className="row">
          <div className="col-lg-6">
            <h2 className="connect-title">Connect with ARC</h2>
            <div className="connect-desc">
              ARC provides journalists with timely statistics, data analysis and
              in-depth interviews with subject matter experts.
            </div>
            <div className="connect-buttons">
              <a href="/" className="ctaBtn bg-color-white type-color-concourse">
                Media Inqueries
              </a>
              <a href="/" className="ctaBtn ctaBtn--white-outline" style={{marginLeft: "15px"}}>
                Media Kit
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="connect-contact">
                <div className="contact-title">
                    Contact
                </div>
                <div>Randy Spoon <br/>1-700-816-5119<br/>rspoon@arccorp.com </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
