import { Component } from "react"
import "./Game.css"

/*
class Square extends Component {
  render() {
    return (
      <button
        className={"square"}
        onClick={this.props.onClick}
      >
        { this.props.value }
      </button>
    )
  }
}*/

function Square(props) {
  return (
    <button
      className={"square"}
      onClick={ props.onClick }
    >
      { props.value }
    </button>
  )
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: new Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? "X" : "O"
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        key={i}
      />
    )
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
      status = "Winner:" + winner
    } else {
      status = `Next player: ${ this.state.xIsNext ? "X" : "O" }`;
    }

    return <div>
      <h3>{ status }</h3>
      <div className={"board"}>
        {this.state.squares.map((_, index) => this.renderSquare(index))}
      </div>
    </div>
  }
}

export default class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


