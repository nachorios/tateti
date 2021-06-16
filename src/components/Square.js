import React, { Component } from "react";

class Square extends Component {
  render() {
    return (
      <button style={style} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

const style = {
  border: "2px solid black",
  fontSize: "30px",
  fontWeight: "800",
  cursor: "pointer",
  outline: "none",
};

export default Square;
