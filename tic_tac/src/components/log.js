export default function Log({ turns }) {
    return <div>
        <ol id="log">
            {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>
                {turn.Player} selected {turn.square.row},{turn.square.col}</li>)}
        </ol>
    </div>
}