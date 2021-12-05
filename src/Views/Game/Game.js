import { Component } from "react"
import "./Game.css"
import { Board, HistoryItem } from "./components"
import { calculateWinner } from "./tools"
import logo from "../../assets/logo.svg";

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
      status = "Winner: " + winner.value
    } else {
      if (current.squares.every(item => !!item === true)) {
        status = "No Winner!"
      } else {
        status = `Next player: ${ this.state.xIsNext ? "X" : "O" }`;
      }
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
              line={ winner && winner.line }
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
