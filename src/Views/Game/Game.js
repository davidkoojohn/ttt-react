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

function Board(props) {
  return <div className={"board"}>
    { props.squares.map((_, index) => <Square
      value={ props.squares[index]}
      onClick={() => props.onClick(index)}
      key={index}
    />)}
  </div>
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) },
      ],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return
    squares[i] = this.state.xIsNext ? "X" : "O"
    this.setState({
      history: history.concat([
        { squares }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })
  }

  jumpTo(step) {
    console.log(step)
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    let status
    if (winner) {
      status = "Winner:" + winner
    } else {
      status = `Next player: ${ this.state.xIsNext ? "X" : "O" }`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>
            { history.map((item, index) => <li key={index}>
              <button
                onClick={() => this.jumpTo(index)}
              >
                { index ? 'Go to move #' + index : 'Go to game start' }
              </button>
            </li>) }
          </ol>
        </div>
      </div>
    );
  }
}


