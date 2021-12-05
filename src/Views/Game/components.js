export function Square(props) {
  return (
    <button
      className={(props.bgRed ? "red" : "")+" square"}
      onClick={ props.onClick }
    >
      { props.value }
    </button>
  )
}

export function Board(props) {
  return <div className={"board"}>
    { props.squares.map((_, index) => (
      <Square
        value={ props.squares[index]}
        onClick={() => props.onClick(index)}
        key={index}
        bgRed={props.line && props.line.includes(index)}
      />
    ))}
  </div>
}

export function HistoryItem(props) {
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
