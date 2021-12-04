import { Component } from "react"
import "./Game.css"

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
        {
          squares: Array(9).fill(null),
          pos: []
        },
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
        {
          squares,
          pos: [parseInt(i / 3) + 1, i % 3 + 1] // [行, 列]
        }
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
      status = "Winner: " + winner
    } else {
      status = `Next player: ${ this.state.xIsNext ? "X" : "O" }`;
    }

    return (
      <div className="game">
        <h3 className={"status"}>{ status }</h3>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <ol>
            { history.map((item, index) => (
              <li
                key={index}
                style={{
                  fontWeight: index === this.state.stepNumber ? "bold" : "normal",
                  color: index === this.state.stepNumber ? "red" : "#333"
                }}
              >
                <div>
                  <i className={"index"}>{ index + 1 }. </i>
                  <span className={"pos"}>坐标：{ item.pos[0] } 行 - { item.pos[1] } 列</span>
                </div>
                <button
                  style={{ marginLeft: "20px" }}
                  onClick={() => this.jumpTo(index)}
                >
                  { index ? 'Go to move #' + index : 'Go to start' }
                </button>
              </li>
            )) }
          </ol>
        </div>
      </div>
    );
  }
}


