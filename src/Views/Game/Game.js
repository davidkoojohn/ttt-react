import { Component } from "react"
import "./Game.css"
import logo from "../../assets/logo.svg";

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

function HistoryItem(props) {
  const { index, pos, stepNumber, onClick } = props
  const btnText = index ? 'Go to move #' + index : 'Go to start'

  return (
    <li className={index === stepNumber ? "active" : ""}>
      <div>
        { index > 0 && <>
          <i className={"index"}>{ index }. </i>
          <span className={"pos"}>POS：({ pos[0] }, { pos[1] })</span>
        </>}
      </div>
      <button onClick={() => onClick(index)}>{ btnText }</button>
    </li>
  )
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

    const moves = history.map((item, index) => (
      <HistoryItem
        key={index}
        pos={item.pos}
        index={index}
        stepNumber={this.state.stepNumber}
        onClick={(step) => this.jumpTo(step)}
      />)
    )

    return (
      <div className="game-container">
        <header className="game-header">
          <img src={logo} className="logo" alt="logo" />
          <span>Tic-Tac-Toe (三连棋)游戏</span>
        </header>
        <div className="game">
          <h3 className={"status"}>{ status }</h3>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <ol>{ moves }</ol>
          </div>
        </div>
      </div>
    );
  }
}


