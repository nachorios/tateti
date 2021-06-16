import React, { Component } from "react";

import Square from "./Square";

class Board extends Component {
  render() {
    const { squares, onClick } = this.props;
    return (
      <div style={style}>
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => onClick(i)} />
        ))}
      </div>
    );
  }
}

const style = {
  border: "4px solid black",
  borderRadius: "10px",
  width: "250px",
  height: "250px",
  margin: "0 auto",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};

export default Board;
