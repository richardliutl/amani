import React, { Component } from "react";

class ActiveOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: this.props.data,
        wheelAngle: this.props.wheelAngle,
    };
  }

  render() {
    let data = this.props.data;
    let ps = 360/data.length;
    let rotation = this.props.wheelAngle + 0.5*ps; // add 0.5*ps to repair artificial offset
    let picked = Math.round(data.length - (rotation % 360)/ps);
    picked = picked >= data.length ? (picked % data.length) : picked;

    return (
      <>
        <div className="Picker-active-option">
            <h1>{data[picked].name}</h1>
        </div>
      </>
    );
  }
}

export default ActiveOption;
