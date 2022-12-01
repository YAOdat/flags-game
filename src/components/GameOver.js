
function GameOver (props) {

let playAgain = () => {
// refresh the page
window.location.reload();
    }


return (
    <div className="game-over">
        <h3> {`Your score is ${props.score} and it took you ${props.timer} seconds`}</h3>
        <button className="start" onClick={() => playAgain()}>Play Again?</button>
    </div>
);
}

export default GameOver;