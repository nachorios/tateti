import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }
  winner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  onPress(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.winner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo = (step) => {
    const history = this.state.history.slice(0, step + 1);

    this.setState({
      history,
      xIsNext: step % 2 ? false : true,
    });

    const steps = document.querySelectorAll("li");
    const selected = [...steps].filter((step) =>
      step.classList.contains("selected")
    )[0];
    if (selected) {
      selected.classList.remove("selected");
    }
    steps[step].classList.add("selected");
  };

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = this.winner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Movimiento " + move : "Empezar";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Ganador: " + winner;
    } else {
      status = "Siguiente jugador: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div style={styles}>
        <Board squares={current.squares} onClick={(i) => this.onPress(i)} />

        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    );
  }
}
const styles = {
  width: "200px",
  margin: "20px auto",
};
export default Game;
