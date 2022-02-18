import { ReactChild, ReactFragment, ReactPortal } from "react";
import "./scoreBoard.css";

function ScoreBoard(score: number): JSX.Element {
    
    return (
        <div className="scoreBoard">
			<h2>{score}</h2>
        </div>
    );
}

export default ScoreBoard;
